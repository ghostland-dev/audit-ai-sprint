
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Play, FileText, Calendar, AlertTriangle, Trash2, Eye } from "lucide-react"
import { useAuditStore } from "@/stores/auditStore"
import { toast } from "@/hooks/use-toast"

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case "high":
      return <Badge className="bg-red-100 text-red-800">Critique</Badge>
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800">Moyen</Badge>
    case "low":
      return <Badge className="bg-green-100 text-green-800">Faible</Badge>
    default:
      return <Badge variant="secondary">{severity}</Badge>
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800">Terminé</Badge>
    case "running":
      return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>
    case "failed":
      return <Badge className="bg-red-100 text-red-800">Échoué</Badge>
    case "pending":
      return <Badge className="bg-gray-100 text-gray-800">En attente</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function AuditsPage() {
  const navigate = useNavigate()
  const { audits, deleteAudit } = useAuditStore()

  const handleDelete = (auditId: string, auditName: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'audit "${auditName}" ?`)) {
      deleteAudit(auditId)
      toast({
        title: "Audit supprimé",
        description: `L'audit "${auditName}" a été supprimé avec succès`
      })
    }
  }

  // Calculer les statistiques
  const stats = {
    total: audits.length,
    completed: audits.filter(a => a.status === 'completed').length,
    running: audits.filter(a => a.status === 'running').length,
    totalIssues: audits.reduce((sum, audit) => sum + audit.issues, 0),
    averageScore: audits.filter(a => a.score).length > 0 
      ? Math.round(audits.filter(a => a.score).reduce((sum, audit) => sum + (audit.score || 0), 0) / audits.filter(a => a.score).length)
      : 0
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Audits de Code</h1>
            <p className="text-muted-foreground">Historique et gestion de vos audits de sécurité</p>
          </div>
          <Button onClick={() => navigate("/audits/new")}>
            <Play className="w-4 h-4 mr-2" />
            Nouvel Audit
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Audits Totaux</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.completed} terminés, {stats.running} en cours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Problèmes Détectés</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalIssues}</div>
              <p className="text-xs text-muted-foreground">Total des problèmes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score Moyen</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">Qualité moyenne</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Audits Récents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {audits.filter(a => {
                  const today = new Date()
                  const auditDate = new Date(a.createdAt)
                  const diffTime = Math.abs(today.getTime() - auditDate.getTime())
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                  return diffDays <= 7
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">Cette semaine</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Audits Récents</CardTitle>
            <CardDescription>Historique des derniers audits effectués</CardDescription>
          </CardHeader>
          <CardContent>
            {audits.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun audit pour le moment</h3>
                <p className="text-muted-foreground mb-4">
                  Commencez par créer votre premier audit de code
                </p>
                <Button onClick={() => navigate("/audits/new")}>
                  <Play className="w-4 h-4 mr-2" />
                  Créer un audit
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Projet</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Sévérité</TableHead>
                    <TableHead>Problèmes</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell className="font-medium">{audit.projectName}</TableCell>
                      <TableCell>{new Date(audit.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>{getStatusBadge(audit.status)}</TableCell>
                      <TableCell>{getSeverityBadge(audit.severity)}</TableCell>
                      <TableCell>{audit.issues}</TableCell>
                      <TableCell>{audit.score ? `${audit.score}%` : '-'}</TableCell>
                      <TableCell>{audit.duration || '-'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate(`/audits/${audit.id}`)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(audit.id, audit.projectName)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
