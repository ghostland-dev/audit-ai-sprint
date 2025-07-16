
import { LucideIcon, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuditStore } from "@/stores/auditStore"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  trend: "up" | "down"
}

interface StatsGridProps {
  stats?: StatCardProps[]
}

export function StatsGrid({ stats }: StatsGridProps) {
  const { audits } = useAuditStore()

  // Calculer les statistiques en temps réel si elles ne sont pas fournies
  const defaultStats = [
    {
      title: "Projets audités",
      value: audits.length.toString(),
      description: `${audits.filter(a => a.status === 'completed').length} terminés`,
      icon: require("lucide-react").GitBranch,
      trend: "up" as const
    },
    {
      title: "Audits réalisés",
      value: audits.filter(a => a.status === 'completed').length.toString(),
      description: `${audits.filter(a => a.status === 'running').length} en cours`,
      icon: require("lucide-react").Shield,
      trend: "up" as const
    },
    {
      title: "Problèmes détectés",
      value: audits.reduce((sum, audit) => sum + audit.issues, 0).toString(),
      description: `${audits.filter(a => a.severity === 'high').length} critiques`,
      icon: require("lucide-react").AlertTriangle,
      trend: "down" as const
    },
    {
      title: "Score moyen",
      value: audits.filter(a => a.score).length > 0 
        ? `${Math.round(audits.filter(a => a.score).reduce((sum, audit) => sum + (audit.score || 0), 0) / audits.filter(a => a.score).length)}%`
        : "N/A",
      description: "Qualité globale",
      icon: require("lucide-react").CheckCircle,
      trend: "up" as const
    }
  ]

  const statsToShow = stats || defaultStats

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsToShow.map((stat, index) => (
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
  )
}
