
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitBranch, Eye } from "lucide-react"
import { useAuditStore } from "@/stores/auditStore"

export function RecentAudits() {
  const navigate = useNavigate()
  const { audits } = useAuditStore()
  
  // Prendre les 5 audits les plus récents
  const recentAudits = audits.slice(0, 5)

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
          {recentAudits.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4">Aucun audit pour le moment</p>
              <Button onClick={() => navigate("/audits/new")}>
                Créer votre premier audit
              </Button>
            </div>
          ) : (
            recentAudits.map((audit) => (
              <div key={audit.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
                    <GitBranch className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{audit.projectName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(audit.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {audit.status === "completed" ? (
                    <>
                      {audit.score && (
                        <Badge variant="outline" className="text-green-600">
                          Score: {audit.score}%
                        </Badge>
                      )}
                      {audit.issues > 0 && (
                        <Badge variant="destructive">
                          {audit.issues} problèmes
                        </Badge>
                      )}
                    </>
                  ) : audit.status === "running" ? (
                    <Badge variant="secondary">En cours</Badge>
                  ) : audit.status === "failed" ? (
                    <Badge className="bg-red-100 text-red-800">Échoué</Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800">En attente</Badge>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/audits/${audit.id}`)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
