
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Eye, Calendar, TrendingUp } from "lucide-react"

const reports = [
  {
    id: 1,
    title: "Rapport de Sécurité - E-commerce",
    project: "E-commerce Frontend",
    date: "2024-01-15",
    type: "security",
    status: "completed",
    issues: 12,
    size: "2.3 MB"
  },
  {
    id: 2,
    title: "Analyse de Code - API",
    project: "API Backend",
    date: "2024-01-14",
    type: "code-quality",
    status: "completed",
    issues: 8,
    size: "1.8 MB"
  },
  {
    id: 3,
    title: "Audit Complet - Mobile",
    project: "Mobile App",
    date: "2024-01-12",
    type: "comprehensive",
    status: "completed",
    issues: 3,
    size: "4.1 MB"
  }
]

const getTypeBadge = (type: string) => {
  switch (type) {
    case "security":
      return <Badge className="bg-red-100 text-red-800">Sécurité</Badge>
    case "code-quality":
      return <Badge className="bg-blue-100 text-blue-800">Qualité</Badge>
    case "comprehensive":
      return <Badge className="bg-purple-100 text-purple-800">Complet</Badge>
    default:
      return <Badge variant="secondary">{type}</Badge>
  }
}

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Rapports</h1>
            <p className="text-muted-foreground">Consultez et téléchargez vos rapports d'audit</p>
          </div>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Générer Rapport
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rapports Générés</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+5 ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Téléchargements</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">+18% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taille Totale</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125 MB</div>
              <p className="text-xs text-muted-foreground">Stockage utilisé</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rapports Récents</CardTitle>
            <CardDescription>Liste des derniers rapports générés</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Projet</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Problèmes</TableHead>
                  <TableHead>Taille</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{report.project}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{getTypeBadge(report.type)}</TableCell>
                    <TableCell>{report.issues}</TableCell>
                    <TableCell>{report.size}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
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
