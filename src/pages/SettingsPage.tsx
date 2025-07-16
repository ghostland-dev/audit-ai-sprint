
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, Key, Palette } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    company: "DevAudit AI",
    bio: "Expert en sécurité et audit de code",
    avatar: null
  })

  const [notifications, setNotifications] = useState({
    emailReports: true,
    securityAlerts: true,
    projectUpdates: false,
    weeklyDigest: true
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: "30",
    ipWhitelist: ""
  })

  const handleProfileSave = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès"
    })
  }

  const handleNotificationSave = () => {
    toast({
      title: "Préférences mises à jour",
      description: "Vos préférences de notification ont été sauvegardées"
    })
  }

  const handleSecuritySave = () => {
    toast({
      title: "Sécurité mise à jour",
      description: "Vos paramètres de sécurité ont été sauvegardés"
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground">
            Gérez vos préférences et paramètres de compte
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Sécurité</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center space-x-2">
              <Key className="w-4 h-4" />
              <span>API</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations du profil</CardTitle>
                <CardDescription>
                  Mettez à jour vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar || undefined} />
                    <AvatarFallback className="text-lg">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      Changer l'avatar
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG, PNG ou GIF. Max 5MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button onClick={handleProfileSave}>
                  Sauvegarder les modifications
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notification</CardTitle>
                <CardDescription>
                  Choisissez comment vous souhaitez être notifié
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Rapports par email</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevez les rapports d'audit par email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailReports}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, emailReports: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Alertes de sécurité</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications pour les vulnérabilités critiques
                      </p>
                    </div>
                    <Switch
                      checked={notifications.securityAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, securityAlerts: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mises à jour de projet</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications pour les nouveaux commits
                      </p>
                    </div>
                    <Switch
                      checked={notifications.projectUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, projectUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Résumé hebdomadaire</Label>
                      <p className="text-sm text-muted-foreground">
                        Rapport hebdomadaire de vos projets
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, weeklyDigest: checked })
                      }
                    />
                  </div>
                </div>

                <Button onClick={handleNotificationSave}>
                  Sauvegarder les préférences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de sécurité</CardTitle>
                <CardDescription>
                  Protégez votre compte avec des mesures de sécurité avancées
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">
                      Ajoutez une couche de sécurité supplémentaire
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactor}
                    onCheckedChange={(checked) => 
                      setSecurity({ ...security, twoFactor: checked })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout de session (minutes)</Label>
                  <Select 
                    value={security.sessionTimeout} 
                    onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 heure</SelectItem>
                      <SelectItem value="120">2 heures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ipWhitelist">Whitelist IP (optionnel)</Label>
                  <Textarea
                    id="ipWhitelist"
                    value={security.ipWhitelist}
                    onChange={(e) => setSecurity({ ...security, ipWhitelist: e.target.value })}
                    placeholder="192.168.1.1&#10;10.0.0.1"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    Une adresse IP par ligne
                  </p>
                </div>

                <Button onClick={handleSecuritySave}>
                  Sauvegarder la sécurité
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>Clés API</CardTitle>
                <CardDescription>
                  Gérez vos clés API pour l'intégration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Clé API principale</p>
                      <p className="text-sm text-muted-foreground">
                        Dernière utilisation: Il y a 2 jours
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        Régénérer
                      </Button>
                    </div>
                  </div>
                </div>

                <Button>
                  Créer une nouvelle clé API
                </Button>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Documentation API</h4>
                  <p className="text-sm text-muted-foreground">
                    Consultez notre documentation complète pour intégrer l'API DevAudit dans vos applications.
                  </p>
                  <Button variant="link" className="p-0 mt-2">
                    Voir la documentation →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
