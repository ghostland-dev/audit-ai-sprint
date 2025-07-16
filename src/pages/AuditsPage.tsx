
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Play, FileText, Calendar, AlertTriangle } from "lucide-react"

const audits = [
  {
    id: 1,
    project: "E-commerce Frontend",
    date: "2024-01-15",
    status: "completed",
    severity: "high",
    issues: 12,
    duration: "15 min"
  },
  {
    id: 2,
    project: "API Backend", 
    date: "2024-01-14",
    status: "running",
    severity: "medium",
    issues: 8,
    duration: "8 min"
  },
  {
    id: 3,
    project: "Mobile App",
    date: "2024-01-12",
    status: "completed",
    severity: "low",
    issues: 3,
    duration: "12 min"
  }
]

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
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function AuditsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Audits de Code</h1>
            <p className="text-muted-foreground">Historique et gestion de vos audits de sécurité</p>
          </div>
          <Button>
            <Play className="w-4 h-4 mr-2" />
            Nouvel Audit
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Audits Totaux</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Problèmes Détectés</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">-8% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temps Moyen</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 min</div>
              <p className="text-xs text-muted-foreground">-2 min ce mois</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Audits Récents</CardTitle>
            <CardDescription>Historique des derniers audits effectués</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projet</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Sévérité</TableHead>
                  <TableHead>Problèmes</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {audits.map((audit) => (
                  <TableRow key={audit.id}>
                    <TableCell className="font-medium">{audit.project}</TableCell>
                    <TableCell>{audit.date}</TableCell>
                    <TableCell>{getStatusBadge(audit.status)}</TableCell>
                    <TableCell>{getSeverityBadge(audit.severity)}</TableCell>
                    <TableCell>{audit.issues}</TableCell>
                    <TableCell>{audit.duration}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        Rapport
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
