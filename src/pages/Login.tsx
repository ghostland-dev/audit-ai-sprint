
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Zap, Github, Mail } from "lucide-react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, on ajouterait la logique d'authentification
    console.log("Connexion avec:", { email, password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">DevAudit AI</span>
          </Link>
          <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Se connecter</CardTitle>
            <CardDescription className="text-center">
              Accédez à votre dashboard d'audit de code
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Boutons sociaux */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continuer avec
                </span>
              </div>
            </div>

            {/* Formulaire de connexion */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Se souvenir de moi
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-600 hover:text-purple-500"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button type="submit" className="w-full gradient-primary text-white">
                Se connecter
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-gray-600">Pas encore de compte ? </span>
              <Link
                to="/register"
                className="text-purple-600 hover:text-purple-500 font-medium"
              >
                Créer un compte
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Version d'essai */}
        <div className="mt-6 text-center">
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6">
              <div className="text-sm">
                <span className="text-purple-800 font-medium">Nouveau sur DevAudit AI ?</span>
                <br />
                <span className="text-purple-600">
                  Commencez avec 50 scans gratuits, aucune carte bancaire requise
                </span>
              </div>
              <Link to="/dashboard">
                <Button variant="outline" className="mt-3 border-purple-300 text-purple-700 hover:bg-purple-100">
                  Essayer gratuitement
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login
