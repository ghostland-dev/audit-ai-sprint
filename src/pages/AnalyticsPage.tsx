
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VulnerabilityChart } from "@/components/analytics/VulnerabilityChart"
import { ScoreChart } from "@/components/analytics/ScoreChart"
import { TrendingUp, TrendingDown, BarChart3, Shield } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Analyse détaillée des performances de sécurité
          </p>
        </div>

        {/* Métriques globales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score Moyen</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +2% ce mois
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vulnérabilités Critiques</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                -5 ce mois
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temps de Résolution</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3j</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                -0.5j ce mois
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Couverture Code</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +5% ce mois
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques */}
        <div className="grid gap-6 md:grid-cols-2">
          <VulnerabilityChart />
          <ScoreChart />
        </div>

        {/* Détails par projet */}
        <Card>
          <CardHeader>
            <CardTitle>Performance par projet</CardTitle>
            <CardDescription>
              Comparaison des scores de sécurité par projet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "E-commerce App", score: 92, trend: "up", change: "+3%" },
                { name: "API Gateway", score: 89, trend: "up", change: "+1%" },
                { name: "Mobile App", score: 87, trend: "down", change: "-2%" },
                { name: "Admin Panel", score: 95, trend: "up", change: "+5%" }
              ].map((project, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">Score: {project.score}%</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ${project.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {project.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
