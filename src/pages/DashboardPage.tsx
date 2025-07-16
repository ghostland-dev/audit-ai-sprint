
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { RecentAudits } from "@/components/dashboard/RecentAudits"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { useNavigate } from "react-router-dom"
import { 
  Shield, 
  GitBranch, 
  AlertTriangle,
  CheckCircle,
  Plus
} from "lucide-react"

export default function DashboardPage() {
  const navigate = useNavigate()

  const stats = [
    {
      title: "Projets actifs",
      value: "12",
      description: "+2 ce mois",
      icon: GitBranch,
      trend: "up" as const
    },
    {
      title: "Audits réalisés",
      value: "245",
      description: "+15 cette semaine",
      icon: Shield,
      trend: "up" as const
    },
    {
      title: "Vulnérabilités détectées",
      value: "8",
      description: "Niveau critique: 2",
      icon: AlertTriangle,
      trend: "down" as const
    },
    {
      title: "Taux de réussite",
      value: "94%",
      description: "+3% vs mois dernier",
      icon: CheckCircle,
      trend: "up" as const
    }
  ]

  const recentAudits = [
    {
      project: "E-commerce App",
      status: "completed" as const,
      score: 92,
      date: "Il y a 2h",
      vulnerabilities: 3
    },
    {
      project: "API Gateway",
      status: "in-progress" as const,
      score: null,
      date: "En cours",
      vulnerabilities: null
    },
    {
      project: "Mobile App",
      status: "completed" as const,
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
          <Button 
            className="gradient-primary text-white"
            onClick={() => navigate("/audits/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvel audit
          </Button>
        </div>

        {/* Stats Cards */}
        <StatsGrid stats={stats} />

        {/* Recent Audits and Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <RecentAudits audits={recentAudits} />
          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  )
}
