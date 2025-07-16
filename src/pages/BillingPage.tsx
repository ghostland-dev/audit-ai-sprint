
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Download, Calendar, TrendingUp, Zap, Shield, Crown } from "lucide-react"

const invoices = [
  {
    id: "INV-001",
    date: "2024-01-15",
    amount: "29.99 €",
    status: "paid",
    plan: "Pro"
  },
  {
    id: "INV-002", 
    date: "2023-12-15",
    amount: "29.99 €",
    status: "paid",
    plan: "Pro"
  },
  {
    id: "INV-003",
    date: "2023-11-15", 
    amount: "9.99 €",
    status: "paid",
    plan: "Starter"
  }
]

const plans = [
  {
    name: "Starter",
    price: "9.99 €",
    period: "/mois",
    features: [
      "5 projets",
      "50 audits/mois",
      "Support email",
      "Rapports basiques"
    ],
    icon: Zap,
    current: false
  },
  {
    name: "Pro",
    price: "29.99 €", 
    period: "/mois",
    features: [
      "25 projets",
      "500 audits/mois",
      "Support prioritaire",
      "Rapports avancés",
      "API access"
    ],
    icon: Shield,
    current: true
  },
  {
    name: "Enterprise",
    price: "99.99 €",
    period: "/mois", 
    features: [
      "Projets illimités",
      "Audits illimités",
      "Support dédié",
      "Rapports personnalisés",
      "Intégrations avancées",
      "SSO"
    ],
    icon: Crown,
    current: false
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge className="bg-green-100 text-green-800">Payé</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
    case "failed":
      return <Badge className="bg-red-100 text-red-800">Échoué</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Facturation</h1>
          <p className="text-muted-foreground">Gérez votre abonnement et consultez vos factures</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plan Actuel</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Pro</div>
              <p className="text-xs text-muted-foreground">29.99 €/mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prochaine Facturation</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 Fév</div>
              <p className="text-xs text-muted-foreground">Dans 12 jours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisation ce Mois</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234/500</div>
              <p className="text-xs text-muted-foreground">Audits utilisés</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className={plan.current ? "ring-2 ring-purple-500" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <plan.icon className="h-5 w-5" />
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  {plan.current && <Badge className="bg-purple-100 text-purple-800">Actuel</Badge>}
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-1 h-1 bg-green-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-4" 
                  variant={plan.current ? "secondary" : "default"}
                  disabled={plan.current}
                >
                  {plan.current ? "Plan Actuel" : "Choisir ce Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historique de Facturation</CardTitle>
            <CardDescription>Consultez et téléchargez vos factures</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facture</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.plan}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
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
