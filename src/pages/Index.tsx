
import { ArrowRight, Check, Zap, Shield, BarChart3, GitBranch, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: "Audit en 5 minutes",
      description: "Analyse complète de votre code en moins de 5 minutes grâce à notre CI intégrée."
    },
    {
      icon: Shield,
      title: "Détection de vulnérabilités",
      description: "Identification automatique des failles de sécurité avec OWASP ZAP et SonarQube."
    },
    {
      icon: BarChart3,
      title: "Rapports détaillés",
      description: "Visualisations claires et rapports PDF exportables pour vos clients."
    },
    {
      icon: GitBranch,
      title: "Intégration CI/CD",
      description: "Compatible GitHub Actions, GitLab CI et Bitbucket Pipeline."
    }
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "Gratuit",
      description: "Pour découvrir la plateforme",
      features: [
        "50 scans par mois",
        "1 projet",
        "Rapports basiques",
        "Support communautaire"
      ],
      cta: "Commencer gratuitement",
      popular: false
    },
    {
      name: "Pro",
      price: "19€",
      period: "/mois",
      description: "Pour développeurs indépendants",
      features: [
        "500 scans par mois",
        "5 projets",
        "Rapports PDF avancés",
        "Suggestions IA",
        "Support prioritaire"
      ],
      cta: "Essayer 14 jours gratuit",
      popular: true
    },
    {
      name: "Team",
      price: "49€",
      period: "/mois",
      description: "Pour petites équipes",
      features: [
        "2000 scans par mois",
        "Projets illimités",
        "Gestion d'équipe",
        "Intégrations avancées",
        "Support premium"
      ],
      cta: "Démarrer l'essai",
      popular: false
    }
  ]

  const testimonials = [
    {
      name: "Marie L.",
      role: "Développeuse Freelance",
      content: "DevAudit AI m'a fait gagner des heures sur mes audits de code. Mes clients sont ravis de la qualité des rapports !",
      rating: 5
    },
    {
      name: "Thomas K.",
      role: "CTO Startup",
      content: "Enfin un outil d'audit abordable pour les petites équipes. L'intégration GitHub est parfaite.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">DevAudit AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Fonctionnalités</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Tarifs</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Témoignages</a>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Se connecter</Button>
              </Link>
              <Link to="/dashboard">
                <Button className="gradient-primary text-white">
                  Démarrer <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-purple-100 text-purple-700">
            🚀 Nouveau : Suggestions IA avec GPT-4
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Audit de code
            <br />
            <span className="text-gray-900">intelligent et rapide</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Plateforme SaaS d'audit automatique pour développeurs solo et petites équipes. 
            Sécurité, qualité et conformité en moins de 5 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/dashboard">
              <Button size="lg" className="gradient-primary text-white text-lg px-8 py-6">
                Essayer gratuitement <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Voir la démo
            </Button>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-1 border">
              <img 
                src="/placeholder.svg" 
                alt="Dashboard DevAudit AI" 
                className="w-full rounded-xl"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-500 rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Pourquoi choisir DevAudit AI ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une solution complète qui s'adapte à votre workflow existant
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Tarifs transparents</h2>
            <p className="text-xl text-gray-600">
              Commencez gratuitement, évoluez selon vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                    Le plus populaire
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold">
                    {plan.price}
                    {plan.period && <span className="text-lg font-normal text-gray-600">{plan.period}</span>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'gradient-primary text-white' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ils nous font confiance</h2>
            <p className="text-xl text-gray-600">
              Découvrez ce que nos utilisateurs pensent de DevAudit AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à transformer vos audits de code ?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines de développeurs qui font confiance à DevAudit AI
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
              Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">DevAudit AI</span>
              </div>
              <p className="text-gray-400">
                La plateforme d'audit de code nouvelle génération pour développeurs modernes.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Statut</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Communauté</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partenaires</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DevAudit AI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
