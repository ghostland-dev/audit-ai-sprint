
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

interface NewProjectFormProps {
  onSubmit: (project: any) => void
  onCancel: () => void
}

export function NewProjectForm({ onSubmit, onCancel }: NewProjectFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    repository: "",
    framework: "",
    language: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.repository) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      })
      return
    }

    onSubmit({
      ...formData,
      id: Date.now(),
      status: "pending",
      createdAt: new Date().toISOString(),
      lastAudit: null,
      issues: 0,
      resolved: 0
    })

    toast({
      title: "Projet créé",
      description: "Le nouveau projet a été créé avec succès"
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Nouveau Projet</CardTitle>
        <CardDescription>
          Créez un nouveau projet pour commencer l'audit de code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du projet *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Mon super projet"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="framework">Framework</Label>
              <Select value={formData.framework} onValueChange={(value) => setFormData({ ...formData, framework: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue.js</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="nodejs">Node.js</SelectItem>
                  <SelectItem value="nextjs">Next.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description du projet..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="repository">URL du dépôt *</Label>
            <Input
              id="repository"
              value={formData.repository}
              onChange={(e) => setFormData({ ...formData, repository: e.target.value })}
              placeholder="https://github.com/user/repo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Langage principal</Label>
            <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un langage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              Créer le projet
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
