
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitBranch } from "lucide-react"

interface AuditItem {
  project: string
  status: "completed" | "in-progress"
  score: number | null
  date: string
  vulnerabilities: number | null
}

interface RecentAuditsProps {
  audits: AuditItem[]
}

export function RecentAudits({ audits }: RecentAuditsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audits récents</CardTitle>
        <CardDescription>
          Vos derniers audits de code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {audits.map((audit, index) => (
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
                    {audit.vulnerabilities && audit.vulnerabilities > 0 && (
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
  )
}
