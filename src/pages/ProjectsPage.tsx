
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitBranch, Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "E-commerce Frontend",
    description: "Application React pour boutique en ligne",
    status: "active",
    lastAudit: "2024-01-15",
    issues: 12,
    resolved: 45
  },
  {
    id: 2,
    name: "API Backend",
    description: "API REST Node.js avec authentification",
    status: "pending",
    lastAudit: "2024-01-10",
    issues: 8,
    resolved: 23
  },
  {
    id: 3,
    name: "Mobile App",
    description: "Application mobile React Native",
    status: "completed",
    lastAudit: "2024-01-12",
    issues: 3,
    resolved: 67
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />En cours</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800"><AlertCircle className="w-3 h-3 mr-1" />En attente</Badge>
    case "completed":
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Terminé</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Projets</h1>
            <p className="text-muted-foreground">Gérez vos projets et leurs audits de code</p>
          </div>
          <Button>
            <GitBranch className="w-4 h-4 mr-2" />
            Nouveau Projet
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  {getStatusBadge(project.status)}
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    Dernier audit : {project.lastAudit}
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {project.issues} problèmes
                    </span>
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {project.resolved} résolus
                    </span>
                  </div>

                  <Button className="w-full" variant="outline">
                    Voir les détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
