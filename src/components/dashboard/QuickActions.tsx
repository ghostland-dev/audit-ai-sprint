
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, FileText, BarChart3 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function QuickActions() {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions rapides</CardTitle>
        <CardDescription>
          Accès rapide aux fonctionnalités principales
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <Button 
            variant="outline" 
            className="justify-start h-auto p-4"
            onClick={() => navigate("/audits/new")}
          >
            <Shield className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Lancer un audit</div>
              <div className="text-sm text-muted-foreground">
                Analyser un nouveau projet
              </div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-auto p-4"
            onClick={() => navigate("/reports")}
          >
            <FileText className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Voir les rapports</div>
              <div className="text-sm text-muted-foreground">
                Consulter les rapports détaillés
              </div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-auto p-4"
            onClick={() => navigate("/analytics")}
          >
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
  )
}
