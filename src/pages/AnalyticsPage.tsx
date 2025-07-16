
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Activity, Target } from "lucide-react"

const monthlyData = [
  { month: "Jan", audits: 12, issues: 45, resolved: 38 },
  { month: "Fév", audits: 18, issues: 52, resolved: 48 },
  { month: "Mar", audits: 22, issues: 38, resolved: 35 },
  { month: "Avr", audits: 16, issues: 41, resolved: 39 },
  { month: "Mai", audits: 25, issues: 33, resolved: 31 },
  { month: "Jui", audits: 28, issues: 28, resolved: 26 }
]

const issueTypes = [
  { name: "Sécurité", value: 35, color: "#ef4444" },
  { name: "Performance", value: 25, color: "#f59e0b" },
  { name: "Bugs", value: 20, color: "#3b82f6" },
  { name: "Style", value: 20, color: "#10b981" }
]

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Analyses détaillées de vos audits et métriques de performance</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score Moyen</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.7/10</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +0.3 ce mois
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temps de Résolution</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4j</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingDown className="w-3 h-3 mr-1" />
                -0.5j ce mois
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Problèmes Actifs</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3 ce mois
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de Résolution</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2% ce mois
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Audits</CardTitle>
              <CardDescription>Nombre d'audits et problèmes par mois</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="audits" fill="#3b82f6" name="Audits" />
                  <Bar dataKey="issues" fill="#ef4444" name="Problèmes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Taux de Résolution</CardTitle>
              <CardDescription>Évolution du taux de résolution mensuel</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="resolved" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Résolus"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Types de Problèmes</CardTitle>
              <CardDescription>Répartition par catégorie</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={issueTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {issueTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métriques de Performance</CardTitle>
              <CardDescription>Indicateurs clés de performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Couverture de Code</span>
                <Badge className="bg-green-100 text-green-800">87%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dette Technique</span>
                <Badge className="bg-yellow-100 text-yellow-800">Moyenne</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Complexité Cyclomatique</span>
                <Badge className="bg-blue-100 text-blue-800">6.2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Duplication de Code</span>
                <Badge className="bg-green-100 text-green-800">2.1%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Maintenabilité</span>
                <Badge className="bg-green-100 text-green-800">A</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
