
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Send, MessageSquare, Book, Mail, Phone } from "lucide-react"

const faqItems = [
  {
    question: "Comment démarrer mon premier audit ?",
    answer: "Pour démarrer votre premier audit, rendez-vous dans la section 'Projets', cliquez sur 'Nouveau Projet', puis ajoutez votre repository. Une fois configuré, vous pourrez lancer un audit en cliquant sur 'Nouvel Audit'."
  },
  {
    question: "Quels langages de programmation sont supportés ?",
    answer: "DevAudit AI supporte plus de 25 langages incluant JavaScript, TypeScript, Python, Java, C#, PHP, Ruby, Go, Rust, et bien d'autres. La liste complète est disponible dans notre documentation."
  },
  {
    question: "Comment interpréter les résultats d'audit ?",
    answer: "Les résultats sont classés par sévérité : Critique (rouge), Moyen (orange), et Faible (vert). Chaque problème inclut une description détaillée, l'impact potentiel, et des recommandations pour le corriger."
  },
  {
    question: "Puis-je intégrer DevAudit AI dans mon CI/CD ?",
    answer: "Oui, nous proposons des plugins pour Jenkins, GitHub Actions, GitLab CI, et une API REST pour les intégrations personnalisées. Consultez notre documentation technique pour les détails."
  },
  {
    question: "Comment gérer les faux positifs ?",
    answer: "Vous pouvez marquer les problèmes comme 'Faux positif' dans l'interface, et configurer des règles d'exclusion pour éviter qu'ils réapparaissent dans les futurs audits."
  }
]

const supportChannels = [
  {
    title: "Documentation",
    description: "Guides complets et références API",
    icon: Book,
    action: "Consulter"
  },
  {
    title: "Chat en Direct",
    description: "Support instantané pendant les heures ouvrables",
    icon: MessageSquare,
    action: "Démarrer"
  },
  {
    title: "Email Support",
    description: "Réponse sous 24h pour tous les plans",
    icon: Mail,
    action: "Envoyer"
  },
  {
    title: "Support Téléphonique",
    description: "Disponible pour les plans Enterprise",
    icon: Phone,
    action: "Appeler"
  }
]

export default function SupportPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Support</h1>
          <p className="text-muted-foreground">Obtenez de l'aide et trouvez des réponses à vos questions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {supportChannels.map((channel, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <channel.icon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <CardTitle className="text-lg">{channel.title}</CardTitle>
                <CardDescription>{channel.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">{channel.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contacter le Support</CardTitle>
              <CardDescription>Décrivez votre problème et nous vous aiderons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input id="subject" placeholder="Décrivez brièvement votre problème" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Problème technique</SelectItem>
                    <SelectItem value="billing">Facturation</SelectItem>
                    <SelectItem value="feature">Demande de fonctionnalité</SelectItem>
                    <SelectItem value="integration">Intégration</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priorité</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Faible</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="high">Haute</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Décrivez votre problème en détail..."
                  className="min-h-[100px]"
                />
              </div>

              <Button className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Envoyer le Message
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Questions Fréquentes</CardTitle>
              <CardDescription>Trouvez rapidement des réponses aux questions courantes</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Statut du Service</CardTitle>
            <CardDescription>État actuel de nos services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">API Principal</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Opérationnel</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Moteur d'Audit</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Opérationnel</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Génération de Rapports</span>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Dégradé</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Notifications</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Opérationnel</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
