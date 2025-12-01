import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Shield, Heart } from "lucide-react"

const membershipTypes = [
  {
    id: "local",
    name: "Adhérent local",
    description: "Tu habites en Martinique ou en Guadeloupe",
    price: "20€",
    period: "/an",
    benefits: [
      "Analyse prioritaire de ton dossier",
      "Accompagnement personnalisé",
      "Participation aux actions collectives",
      "Accès aux permanences",
    ],
    popular: false,
  },
  {
    id: "solidaire",
    name: "Adhérent solidaire",
    description: "Tarif réduit pour les petits revenus",
    price: "10€",
    period: "/an",
    benefits: [
      "Analyse de ton dossier",
      "Accompagnement de base",
      "Participation aux actions collectives",
      "Accès aux permanences",
    ],
    popular: false,
  },
  {
    id: "diaspora",
    name: "Adhérent diaspora",
    description: "Tu vis en France hexagonale ou ailleurs",
    price: "30€",
    period: "/an",
    benefits: [
      "Analyse prioritaire de ton dossier",
      "Accompagnement à distance",
      "Participation aux actions collectives",
      "Tarifs préférentiels avocats partenaires",
    ],
    popular: true,
  },
  {
    id: "soutien",
    name: "Adhésion de soutien",
    description: "Pour ceux qui veulent nous aider davantage",
    price: "50€",
    period: "/an",
    benefits: [
      "Tout ce qui précède",
      "Accompagnement prioritaire VIP",
      "Tarifs préférentiels avocats partenaires",
      "Invitation aux événements",
    ],
    popular: false,
  },
]

export default function AdhesionDonsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-muted/50 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">Adhésion & dons</h1>
            <p className="text-muted-foreground leading-relaxed">
              Wuvè Zyé vit de ses adhérents et des dons, pas des entreprises qu'elle surveille. C'est ce qui garantit
              notre indépendance et notre liberté d'action.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Devenir adhérent</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Ton adhésion finance nos actions et te donne accès à un accompagnement personnalisé pour tes litiges de
            consommation.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {membershipTypes.map((type) => (
              <Card
                key={type.id}
                className={`relative flex flex-col ${type.popular ? "border-primary shadow-lg" : ""}`}
              >
                {type.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      Populaire
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                  <CardDescription className="text-xs min-h-[2.5rem]">{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold text-foreground">{type.price}</span>
                    <span className="text-muted-foreground">{type.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    {type.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${type.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                    variant={type.popular ? "default" : "outline"}
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Adhérer
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto border-2 border-primary bg-background">
            <CardHeader className="text-center pb-4">
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-2xl text-foreground">Financer nos actions numériques</CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                Audits RGPD, outils, experts
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Nos audits numériques nécessitent des outils spécialisés et parfois l'intervention d'experts
                informatiques indépendants. Vos dons nous permettent d'analyser les sites et services martiniquais qui
                ne respectent pas vos données.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-bold">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Don de 10€
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-bold">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Don de 25€
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-bold">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Don de 50€
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent font-bold"
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Montant libre
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accessibility Note */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-dashed">
            <CardContent className="py-8 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Aucun dossier n'est refusé pour raison financière.</strong>
                <br />
                Si l'argent est un frein, contacte-nous. On trouvera une solution.
              </p>
              <Button asChild variant="link" className="mt-4 text-primary">
                <Link href="/association#contact">Nous contacter</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
