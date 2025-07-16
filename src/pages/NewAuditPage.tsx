
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useAuditStore } from "@/stores/auditStore"

export default function NewAuditPage() {
  const navigate = useNavigate()
  const { createAudit, isLoading } = useAuditStore()
  const [formData, setFormData] = useState({
    projectName: "",
    repository: "",
    branch: "main",
    auditType: "",
    description: ""
  })

  const validateGitRepository = (url: string): boolean => {
    const gitRegex = /^https?:\/\/(github\.com|gitlab\.com|bitbucket\.org)\/[\w.-]+\/[\w.-]+(?:\.git)?$/
    return gitRegex.test(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.projectName || !formData.repository || !formData.auditType) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      })
      return
    }

    if (!validateGitRepository(formData.repository)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une URL de dépôt Git valide (GitHub, GitLab, ou Bitbucket)",
        variant: "destructive"
      })
      return
    }

    try {
      const auditId = await createAudit(formData)
      
      toast({
        title: "Audit créé",
        description: "Le nouvel audit a été lancé avec succès"
      })

      // Rediriger vers la page de détails de l'audit
      navigate(`/audits/${auditId}`)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'audit. Veuillez réessayer.",
        variant: "destructive"
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Nouvel Audit</h1>
            <p className="text-muted-foreground">
              Lancez un audit de code pour analyser votre projet
            </p>
          </div>
        </div>

        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Configuration de l'audit</CardTitle>
            <CardDescription>
              Configurez les paramètres de votre audit de code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Nom du projet *</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    placeholder="Mon projet"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auditType">Type d'audit *</Label>
                  <Select 
                    value={formData.auditType} 
                    onValueChange={(value) => setFormData({ ...formData, auditType: value })}
                    disabled={isLoading}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="security">Sécurité</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="quality">Qualité du code</SelectItem>
                      <SelectItem value="complete">Audit complet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repository">URL du dépôt *</Label>
                <Input
                  id="repository"
                  value={formData.repository}
                  onChange={(e) => setFormData({ ...formData, repository: e.target.value })}
                  placeholder="https://github.com/user/repo"
                  disabled={isLoading}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Formats acceptés : GitHub, GitLab, Bitbucket
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Branche</Label>
                <Input
                  id="branch"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="main"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optionnel)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description de l'audit..."
                  rows={3}
                  disabled={isLoading}
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    "Lancer l'audit"
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                  disabled={isLoading}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
