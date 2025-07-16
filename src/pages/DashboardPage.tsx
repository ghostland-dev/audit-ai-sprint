
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  GitBranch, 
  FileText, 
  BarChart3, 
  Plus,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Projets actifs",
      value: "12",
      description: "+2 ce mois",
      icon: GitBranch,
      trend: "up"
    },
    {
      title: "Audits réalisés",
      value: "245",
      description: "+15 cette semaine",
      icon: Shield,
      trend: "up"
    },
    {
      title: "Vulnérabilités détectées",
      value: "8",
      description: "Niveau critique: 2",
      icon: AlertTriangle,
      trend: "down"
    },
    {
      title: "Taux de réussite",
      value: "94%",
      description: "+3% vs mois dernier",
      icon: CheckCircle,
      trend: "up"
    }
  ]

  const recentAudits = [
    {
      project: "E-commerce App",
      status: "completed",
      score: 92,
      date: "Il y a 2h",
      vulnerabilities: 3
    },
    {
      project: "API Gateway",
      status: "in-progress",
      score: null,
      date: "En cours",
      vulnerabilities: null
    },
    {
      project: "Mobile App",
      status: "completed",
      score: 87,
      date: "Hier",
      vulnerabilities: 5
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Vue d'ensemble de vos audits de code
            </p>
          </div>
          <Button className="gradient-primary text-white">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel audit
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {stat.trend === "up" && (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  )}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Audits */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Audits récents</CardTitle>
              <CardDescription>
                Vos derniers audits de code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAudits.map((audit, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                        <GitBranch className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">{audit.project}</p>
                        <p className="text-sm text-muted-foreground">{audit.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {audit.status === "completed" ? (
                        <>
                          <Badge variant="outline" className="text-green-600">
                            Score: {audit.score}%
                          </Badge>
                          {audit.vulnerabilities > 0 && (
                            <Badge variant="destructive">
                              {audit.vulnerabilities} vulnérabilités
                            </Badge>
                          )}
                        </>
                      ) : (
                        <Badge variant="secondary">En cours</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>
                Accès rapide aux fonctionnalités principales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <Shield className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Lancer un audit</div>
                    <div className="text-sm text-muted-foreground">
                      Analyser un nouveau projet
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start h-auto p-4">
                  <FileText className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Voir les rapports</div>
                    <div className="text-sm text-muted-foreground">
                      Consulter les rapports détaillés
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start h-auto p-4">
                  <BarChart3 className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Analytics</div>
                    <div className="text-sm text-muted-foreground">
                      Tendances et métriques
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
