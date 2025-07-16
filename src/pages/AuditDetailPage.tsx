
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, RefreshCw, Shield, AlertTriangle, Bug, Zap } from "lucide-react"
import { useAuditStore } from "@/stores/auditStore"
import { toast } from "@/hooks/use-toast"
import { useEffect } from "react"

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case "critical":
      return <Badge className="bg-red-600 text-white">Critique</Badge>
    case "high":
      return <Badge className="bg-red-100 text-red-800">Élevé</Badge>
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800">Moyen</Badge>
    case "low":
      return <Badge className="bg-green-100 text-green-800">Faible</Badge>
    default:
      return <Badge variant="secondary">{severity}</Badge>
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "security":
      return <Shield className="h-4 w-4" />
    case "performance":
      return <Zap className="h-4 w-4" />
    case "quality":
      return <AlertTriangle className="h-4 w-4" />
    case "bug":
      return <Bug className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

export default function AuditDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Add safety check for params
  let params
  try {
    params = useParams<{ id: string }>()
  } catch (error) {
    console.error("Error getting params:", error)
    // Fallback: try to extract ID from pathname
    const pathParts = location.pathname.split('/')
    const idFromPath = pathParts[pathParts.length - 1]
    params = { id: idFromPath }
  }
  
  const { getAuditById, runAudit, fetchAudits } = useAuditStore()
  
  // Ensure we have fetched audits
  useEffect(() => {
    fetchAudits()
  }, [fetchAudits])
  
  const audit = params?.id ? getAuditById(params.id) : null

  if (!params?.id) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold mb-4">ID d'audit manquant</h2>
          <Button onClick={() => navigate("/audits")}>
            Retour aux audits
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  if (!audit) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold mb-4">Audit non trouvé</h2>
          <p className="text-muted-foreground mb-4">
            L'audit avec l'ID {params.id} n'existe pas ou n'a pas encore été chargé.
          </p>
          <Button onClick={() => navigate("/audits")}>
            Retour aux audits
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const handleRerun = async () => {
    try {
      await runAudit(audit.id)
      toast({
        title: "Audit relancé",
        description: "L'audit a été relancé avec succès"
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de relancer l'audit",
        variant: "destructive"
      })
    }
  }

  const handleDownloadReport = () => {
    // Simuler le téléchargement d'un rapport
    const reportData = {
      audit: audit,
      generatedAt: new Date().toISOString(),
      summary: {
        totalIssues: audit.issues,
        severity: audit.severity,
        score: audit.score
      }
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-report-${audit.projectName}-${audit.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: "Rapport téléchargé",
      description: "Le rapport d'audit a été téléchargé avec succès"
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate("/audits")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{audit.projectName}</h1>
              <p className="text-muted-foreground">
                Détails de l'audit #{audit.id}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleRerun}
              disabled={audit.status === 'running'}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Relancer
            </Button>
            <Button onClick={handleDownloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Télécharger le rapport
            </Button>
          </div>
        </div>

        {/* Informations générales */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Dépôt</label>
                <p className="font-mono text-sm">{audit.repository}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Branche</label>
                <p>{audit.branch}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Type d'audit</label>
                <p className="capitalize">{audit.auditType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Statut</label>
                <div className="mt-1">
                  <Badge 
                    className={
                      audit.status === 'completed' ? 'bg-green-100 text-green-800' :
                      audit.status === 'running' ? 'bg-blue-100 text-blue-800' :
                      audit.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }
                  >
                    {audit.status === 'completed' ? 'Terminé' :
                     audit.status === 'running' ? 'En cours' :
                     audit.status === 'failed' ? 'Échoué' :
                     'En attente'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Résultats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {audit.score !== undefined && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Score global</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Progress value={audit.score} className="flex-1" />
                    <span className="text-2xl font-bold">{audit.score}%</span>
                  </div>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Problèmes détectés</label>
                <p className="text-2xl font-bold">{audit.issues}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Sévérité</label>
                <div className="mt-1">
                  {getSeverityBadge(audit.severity)}
                </div>
              </div>
              {audit.duration && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Durée</label>
                  <p>{audit.duration}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Détails des problèmes */}
        {audit.results && audit.results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Problèmes détectés</CardTitle>
              <CardDescription>
                Liste détaillée des problèmes trouvés lors de l'audit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Sévérité</TableHead>
                    <TableHead>Fichier</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Ligne</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audit.results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(result.type)}
                          <span className="capitalize">{result.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getSeverityBadge(result.severity)}</TableCell>
                      <TableCell className="font-mono text-sm">{result.file}</TableCell>
                      <TableCell className="max-w-md truncate">{result.message}</TableCell>
                      <TableCell>{result.line || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {audit.status === 'running' && (
          <Card>
            <CardContent className="py-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-muted-foreground">Audit en cours d'exécution...</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
