
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", score: 85 },
  { name: "Fév", score: 88 },
  { name: "Mar", score: 90 },
  { name: "Avr", score: 92 },
  { name: "Mai", score: 94 },
  { name: "Jun", score: 96 }
]

export function ScoreChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution du score</CardTitle>
        <CardDescription>
          Score moyen de sécurité au fil du temps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[80, 100]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
