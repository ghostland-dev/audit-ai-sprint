
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricCard } from "@/components/ui/metric-card"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Header } from "@/components/layout/Header"
import {
  BarChart3,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  GitBranch,
  Download,
  Plus,
  TrendingUp,
  Users,
  FileText
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts"

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  // Données simulées pour les graphiques
  const auditTrendData = [
    { date: "01/07", audits: 12, vulnerabilities: 3 },
    { date: "02/07", audits: 15, vulnerabilities: 5 },
    { date: "03/07", audits: 8, vulnerabilities: 2 },
    { date: "04/07", audits: 22, vulnerabilities: 8 },
    { date: "05/07", audits: 18, vulnerabilities: 4 },
    { date: "06/07", audits: 25, vulnerabilities: 6 },
    { date: "07/07", audits: 30, vulnerabilities: 3 }
  ]

  const vulnerabilityTypeData = [
    { name: "Critique", value: 5, color: "#ef4444" },
    { name: "Élevée", value: 12, color: "#f97316" },
    { name: "Moyenne", value: 25, color: "#eab308" },
    { name: "Faible", value: 18, color: "#22c55e" }
  ]

  const recentProjects = [
    {
      name: "E-commerce Frontend",
      status: "completed",
      score: 85,
      vulnerabilities: 3,
      lastScan: "Il y a 2h",
      language: "React"
    },
    {
      name: "API Backend Node.js",
      status: "scanning",
      score: 0,
      vulnerabilities: 0,
      lastScan: "En cours...",
      language: "Node.js"
    },
    {
      name: "Mobile App Flutter",
      status: "completed",
      score: 92,
      vulnerabilities: 1,
      lastScan: "Il y a 5h",
      language: "Dart"
    },
    {
      name: "Data Processing Python",
      status: "error",
      score: 0,
      vulnerabilities: 0,
      lastScan: "Erreur",
      language: "Python"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "scanning": return "bg-blue-100 text-blue-800"
      case "error": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Terminé"
      case "scanning": return "En cours"
      case "error": return "Erreur"
      default: return "Inconnu"
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-6 space-y-6">
            {/* Header de la page */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600">Vue d'ensemble de vos audits de code</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
                <Button className="gradient-primary text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau projet
                </Button>
              </div>
            </div>

            {/* Métriques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Audits ce mois"
                value="156"
                description="+12 depuis le mois dernier"
                icon={BarChart3}
                trend={{ value: 12, label: "vs mois dernier", isPositive: true }}
              />
              <MetricCard
                title="Vulnérabilités détectées"
                value="23"
                description="5 critiques, 18 autres"
                icon={AlertTriangle}
                trend={{ value: 8, label: "vs semaine dernière", isPositive: false }}
              />
              <MetricCard
                title="Score qualité moyen"
                value="87%"
                description="Excellent score global"
                icon={CheckCircle}
                trend={{ value: 5, label: "en amélioration", isPositive: true }}
              />
              <MetricCard
                title="Temps moyen d'audit"
                value="3.2 min"
                description="Très rapide"
                icon={Clock}
                trend={{ value: 15, label: "plus rapide", isPositive: true }}
              />
            </div>

            {/* Contenu principal avec onglets */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="projects">Projets</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
                <TabsTrigger value="reports">Rapports</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Tendance des audits */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5" />
                        Tendance des audits
                      </CardTitle>
                      <CardDescription>
                        Évolution du nombre d'audits et vulnérabilités détectées
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={auditTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="audits" 
                            stroke="#8b5cf6" 
                            strokeWidth={2}
                            name="Audits"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="vulnerabilities" 
                            stroke="#ef4444" 
                            strokeWidth={2}
                            name="Vulnérabilités"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Répartition des vulnérabilités */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="mr-2 h-5 w-5" />
                        Types de vulnérabilités
                      </CardTitle>
                      <CardDescription>
                        Répartition par niveau de criticité
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={vulnerabilityTypeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {vulnerabilityTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Projets récents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GitBranch className="mr-2 h-5 w-5" />
                      Projets récents
                    </CardTitle>
                    <CardDescription>
                      Derniers audits effectués sur vos projets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentProjects.map((project, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                              <GitBranch className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{project.name}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{project.language}</Badge>
                                <Badge className={getStatusColor(project.status)}>
                                  {getStatusText(project.status)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6">
                            {project.status === "completed" && (
                              <>
                                <div className="text-center">
                                  <div className="text-sm text-gray-500">Score</div>
                                  <div className="font-semibold text-lg">{project.score}%</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-sm text-gray-500">Vulnérabilités</div>
                                  <div className="font-semibold text-lg text-red-600">{project.vulnerabilities}</div>
                                </div>
                              </>
                            )}
                            <div className="text-center">
                              <div className="text-sm text-gray-500">Dernier scan</div>
                              <div className="font-medium">{project.lastScan}</div>
                            </div>
                            <Button variant="outline" size="sm">
                              Voir détails
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <CardTitle>Tous les projets</CardTitle>
                    <CardDescription>
                      Gérez tous vos projets et leurs audits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <GitBranch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Gestion des projets</h3>
                      <p className="text-gray-600">
                        Cette section sera développée pour afficher la liste complète de vos projets
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Analyse de sécurité</CardTitle>
                    <CardDescription>
                      Vue détaillée des vulnérabilités et recommandations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Analyse de sécurité avancée</h3>
                      <p className="text-gray-600">
                        Rapports détaillés et recommandations de sécurité seront affichés ici
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Rapports</CardTitle>
                    <CardDescription>
                      Générez et exportez vos rapports d'audit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Génération de rapports</h3>
                      <p className="text-gray-600">
                        Système de génération et d'export de rapports PDF/HTML
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard
