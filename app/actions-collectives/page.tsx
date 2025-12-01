import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, AlertCircle } from "lucide-react"
import actionsData from "@/data/actions-collectives.json"

const statusColors: Record<string, string> = {
  collecting: "bg-amber-100 text-amber-800 border-amber-200",
  engaged: "bg-blue-100 text-blue-800 border-blue-200",
  resolved: "bg-green-100 text-green-800 border-green-200",
}

export default function ActionsCollectivesPage() {
  const { actions, statusLabels } = actionsData

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-muted/50 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">Actions collectives</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Quand un problème touche beaucoup de monde, on regroupe les dossiers. Plus on est nombreux, plus on pèse.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-foreground mb-2">Signalement</h3>
              <p className="text-sm text-muted-foreground">
                Un problème récurrent est identifié par plusieurs personnes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-foreground mb-2">Collecte</h3>
              <p className="text-sm text-muted-foreground">
                On rassemble les témoignages pour constituer un dossier solide.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-foreground mb-2">Action</h3>
              <p className="text-sm text-muted-foreground">
                Mise en demeure, médiation, ou action en justice si nécessaire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Actions List */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8">Actions en cours</h2>

          {actions.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {actions.map((action) => {
                const progress = Math.round((action.testimoniesCount / action.testimoniesGoal) * 100)
                return (
                  <Card key={action.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-lg mb-2">{action.title}</CardTitle>
                          <Badge variant="outline" className={statusColors[action.status]}>
                            {statusLabels[action.status as keyof typeof statusLabels]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span className="text-sm font-medium">{action.testimoniesCount}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-sm leading-relaxed">{action.description}</CardDescription>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Témoignages collectés</span>
                          <span className="font-medium">
                            {action.testimoniesCount} / {action.testimoniesGoal}
                          </span>
                        </div>
                        <Progress value={progress} className="h-2 [&>div]:bg-accent" />
                      </div>
                      <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        <Link href={`/probleme?type=${action.category}`}>Je suis concerné</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="border-dashed border-2">
              <CardContent className="py-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucune action collective en cours pour le moment.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Propose an action */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
            Tu penses qu'un abus est généralisé ? Parle-nous-en.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Signale-le nous. Si on reçoit suffisamment de témoignages similaires, on ouvre un dossier collectif.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-bold">
            <Link href="/probleme">Proposer une action</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
