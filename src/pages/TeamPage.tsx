
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Mail, MoreHorizontal } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const initialTeamMembers = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "Admin",
    status: "active",
    lastActive: "Il y a 2h",
    avatar: null
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie.martin@example.com",
    role: "Developer",
    status: "active",
    lastActive: "Il y a 1j",
    avatar: null
  },
  {
    id: 3,
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    role: "Viewer",
    status: "invited",
    lastActive: "Jamais",
    avatar: null
  }
]

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "Viewer"
  })

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inviteForm.email) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une adresse email",
        variant: "destructive"
      })
      return
    }

    const newMember = {
      id: Date.now(),
      name: inviteForm.email.split('@')[0],
      email: inviteForm.email,
      role: inviteForm.role,
      status: "invited",
      lastActive: "Jamais",
      avatar: null
    }

    setTeamMembers([...teamMembers, newMember])
    setInviteForm({ email: "", role: "Viewer" })
    setShowInviteForm(false)

    toast({
      title: "Invitation envoyée",
      description: `Une invitation a été envoyée à ${inviteForm.email}`
    })
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>
      case "Developer":
        return <Badge className="bg-blue-100 text-blue-800">Developer</Badge>
      case "Viewer":
        return <Badge className="bg-gray-100 text-gray-800">Viewer</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case "invited":
        return <Badge className="bg-yellow-100 text-yellow-800">Invité</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Équipe</h1>
            <p className="text-muted-foreground">Gérez les membres de votre équipe</p>
          </div>
          <Button onClick={() => setShowInviteForm(!showInviteForm)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Inviter un membre
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membres Total</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers.length}</div>
              <p className="text-xs text-muted-foreground">
                {teamMembers.filter(m => m.status === "active").length} actifs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Invitations</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamMembers.filter(m => m.status === "invited").length}
              </div>
              <p className="text-xs text-muted-foreground">En attente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamMembers.filter(m => m.role === "Admin").length}
              </div>
              <p className="text-xs text-muted-foreground">Administrateurs</p>
            </CardContent>
          </Card>
        </div>

        {/* Formulaire d'invitation */}
        {showInviteForm && (
          <Card>
            <CardHeader>
              <CardTitle>Inviter un nouveau membre</CardTitle>
              <CardDescription>
                Envoyez une invitation pour rejoindre votre équipe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInvite} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                      placeholder="exemple@domain.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Select 
                      value={inviteForm.role} 
                      onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                        <SelectItem value="Developer">Developer</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Envoyer l'invitation</Button>
                  <Button type="button" variant="outline" onClick={() => setShowInviteForm(false)}>
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Liste des membres */}
        <Card>
          <CardHeader>
            <CardTitle>Membres de l'équipe</CardTitle>
            <CardDescription>
              Gérez les rôles et permissions de votre équipe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Membre</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière activité</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || undefined} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(member.role)}</TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell>{member.lastActive}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
