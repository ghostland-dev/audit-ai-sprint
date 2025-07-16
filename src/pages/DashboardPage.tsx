
import { useEffect } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { RecentAudits } from "@/components/dashboard/RecentAudits"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { useNavigate } from "react-router-dom"
import { useAuditStore } from "@/stores/auditStore"
import { 
  Shield, 
  GitBranch, 
  AlertTriangle,
  CheckCircle,
  Plus
} from "lucide-react"

export default function DashboardPage() {
  const navigate = useNavigate()
  const { audits, fetchAudits } = useAuditStore()

  useEffect(() => {
    fetchAudits()
  }, [])

  const stats = [
    {
      title: "Projets actifs",
      value: new Set(audits.map(a => a.projectName)).size.toString(),
      description: `${audits.length} audits au total`,
      icon: GitBranch,
      trend: "up" as const
    },
    {
      title: "Audits réalisés",
      value: audits.filter(a => a.status === 'completed').length.toString(),
      description: `${audits.filter(a => a.status === 'running').length} en cours`,
      icon: Shield,
      trend: "up" as const
    },
    {
      title: "Vulnérabilités détectées",
      value: audits.reduce((sum, audit) => sum + audit.issues, 0).toString(),
      description: `${audits.filter(a => a.severity === 'high').length} critiques`,
      icon: AlertTriangle,
      trend: "down" as const
    },
    {
      title: "Taux de réussite",
      value: audits.filter(a => a.score).length > 0 
        ? `${Math.round(audits.filter(a => a.score).reduce((sum, audit) => sum + (audit.score || 0), 0) / audits.filter(a => a.score).length)}%`
        : "N/A",
      description: "Score moyen global",
      icon: CheckCircle,
      trend: "up" as const
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
          <RecentAudits />
          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  )
}
