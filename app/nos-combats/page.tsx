import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, CreditCard, Package, Truck, Shield, Database, ArrowRight, Flame } from "lucide-react"

const axes = [
  {
    id: "telecoms-banques",
    title: "Télécoms & banques",
    icon: CreditCard,
    secondaryIcon: Phone,
    paragraph:
      "Factures incompréhensibles, frais qui tombent sans prévenir, forfaits jamais résiliés. On aide les consommateurs martiniquais, guadeloupéens et la diaspora à faire respecter leurs droits face aux opérateurs et aux banques.",
    bullets: [
      "Frais bancaires abusifs, commissions d'intervention, découvert mal géré.",
      "Surfacturations, options ajoutées sans accord, coupures injustifiées.",
      "Médiateur bancaire, médiateur télécom, autorités : à qui s'adresser, dans quel ordre.",
    ],
    primaryCta: {
      label: "J'ai un problème avec un opérateur ou une banque",
      href: "/probleme?type=facture",
    },
    secondaryCta: {
      label: "Voir les actions collectives",
      href: "/actions-collectives",
    },
  },
  {
    id: "ecommerce-livraisons",
    title: "E-commerce & livraisons",
    icon: Package,
    secondaryIcon: Truck,
    paragraph:
      "Colis perdus, retards à rallonge, remboursements qui n'arrivent jamais. On décortique les pièges des achats en ligne vers la Martinique et la Guadeloupe, y compris pour la diaspora qui commande depuis l'Hexagone.",
    bullets: [
      "Colis jamais livré ou livré en retard, vendeur qui fait traîner le remboursement.",
      'Faux "essais gratuits", vrais abonnements mensuels cachés.',
      "Marketplaces, SAV, SignalConso : comment monter un dossier solide depuis les Antilles.",
    ],
    primaryCta: {
      label: "Mon colis / achat pose problème",
      href: "/probleme?type=achat",
    },
    secondaryCta: {
      label: "Comprendre mes droits en e-commerce",
      href: "/blog",
    },
  },
  {
    id: "donnees-rgpd",
    title: "Données perso & RGPD Péyi-a",
    icon: Shield,
    secondaryIcon: Database,
    paragraph:
      "Spam, démarchage, cookies forcés, comptes jamais supprimés : on fait respecter vos droits numériques, même si les sites et services locaux les ignorent encore trop souvent.",
    bullets: [
      "Modèles de mails RGPD prêts à envoyer pour accès, suppression, opposition.",
      "Baromètre RGPD Péyi-a sur les sites et services utilisés en Martinique.",
      "Actions collectives quand un acteur abuse et refuse de répondre.",
    ],
    primaryCta: {
      label: "Voir l'opération RGPD Péyi-a",
      href: "/rgpd-peyi-a",
    },
    secondaryCta: {
      label: "Je finance les audits numériques",
      href: "/adhesion-et-dons#dons",
    },
  },
]

export default function NosCombatsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-background py-16 lg:py-24 border-b-4 border-primary">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
              Nos combats
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
              Télécoms, banques, e-commerce, données perso : on s'attaque aux abus, sur place et en ligne.
            </p>
            <p className="mt-4 text-base text-muted-foreground/80 leading-relaxed">
              On ne se bat pas "en général". On attaque là où les consommateurs antillais se font le plus mal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="border-l-4 border-primary bg-card rounded-r-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Un fil rouge : l'esprit de la mawonerie</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Télécoms, banques, e-commerce, données perso : à chaque fois, on applique la même logique — ne pas
                attendre qu'on nous sauve, mais organiser la défense et les détours, ensemble.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Axes Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-12 lg:space-y-16">
            {axes.map((axe, index) => (
              <Card
                key={axe.id}
                id={axe.id}
                className="overflow-hidden border-l-4 border-l-primary bg-card hover:shadow-lg transition-shadow scroll-mt-24"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <axe.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                      <axe.secondaryIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-foreground">{axe.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed text-pretty">{axe.paragraph}</p>

                  <ul className="space-y-3">
                    {axe.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3 text-muted-foreground">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      <Link href={axe.primaryCta.href}>
                        {axe.primaryCta.label}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                    >
                      <Link href={axe.secondaryCta.href}>{axe.secondaryCta.label}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto border-2 border-primary bg-card">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl md:text-3xl text-foreground text-balance">
                Tu te reconnais dans un de ces combats ?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto text-pretty">
                Si tu as un problème concret ou si tu veux que ces combats existent encore dans 3 ans, il y a deux
                façons de nous aider : nous parler de ton dossier, et/ou devenir membre.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                  <Link href="/probleme">J'ai un problème</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent font-bold"
                >
                  <Link href="/adhesion-et-dons">Je deviens membre</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
