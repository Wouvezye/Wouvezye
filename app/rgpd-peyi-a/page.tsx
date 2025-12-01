import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Shield, Users, FileText, Trash2, Ban, Mail, ArrowRight, AlertTriangle } from "lucide-react"
import barometerData from "@/data/rgpd-barometre.json"

export const metadata: Metadata = {
  title: "RGPD Péyi-a – Protection des données en Martinique",
  description:
    "Opération RGPD Péyi-a : on audite les sites martiniquais, on arme les citoyens avec des modèles de lettres, on agit collectivement pour le respect de vos données.",
  keywords: [
    "RGPD",
    "Martinique",
    "protection données",
    "vie privée",
    "CNIL",
    "cookies",
    "droits numériques",
    "audit sites",
  ],
  openGraph: {
    title: "RGPD Péyi-a – Wuvè Zyé",
    description: "Parce que vos données vous appartiennent. Même en Martinique.",
    type: "website",
  },
}

const actionsColumns = [
  {
    title: "On observe",
    icon: Eye,
    items: [
      "Audit des sites et services martiniquais",
      "Analyse des pratiques de collecte de données",
      "Veille sur les abus récurrents",
    ],
  },
  {
    title: "On arme les citoyens",
    icon: Shield,
    items: [
      "Modèles de lettres prêts à l'emploi",
      "Guides pratiques sur vos droits RGPD",
      "Aide personnalisée pour vos démarches",
    ],
  },
  {
    title: "On agit collectivement",
    icon: Users,
    items: ["Signalements groupés à la CNIL", "Mise en demeure des récidivistes", "Actions collectives si nécessaire"],
  },
]

const letterTypes = [
  {
    icon: FileText,
    title: "Demande d'accès",
    description: "Obtenez une copie de toutes les données qu'un organisme détient sur vous.",
    href: "/modeles/droit-acces",
  },
  {
    icon: Mail,
    title: "Demande de rectification",
    description: "Faites corriger des informations erronées ou incomplètes vous concernant.",
    href: "/modeles/droit-rectification",
  },
  {
    icon: Trash2,
    title: "Demande d'effacement",
    description: "Demandez la suppression de vos données ou la fermeture de votre compte.",
    href: "/modeles/droit-effacement",
  },
  {
    icon: Ban,
    title: "Opposition à la prospection",
    description: "Stoppez les spams commerciaux et le démarchage non sollicité.",
    href: "/modeles/droit-opposition",
  },
]

export default function RGPDPage() {
  return (
    <div className="flex flex-col">
      <section className="relative bg-background py-20 lg:py-28 border-b-4 border-primary">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <p className="text-primary font-bold mb-4">Opération</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
              RGPD Péyi-a
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Parce que vos données vous appartiennent. Même en Martinique.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                <Link href="/probleme?type=numerique">Je veux me défendre</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent font-bold"
              >
                <Link href="#barometre">Voir le baromètre</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Le Constat Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Vos données sont mal protégées</h2>
          <div className="max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
            <p>
              En Martinique comme ailleurs, le RGPD (Règlement Général sur la Protection des Données) s'applique depuis
              2018. Pourtant, de nombreux sites web, commerces et services locaux ne respectent pas cette
              réglementation.
            </p>
            <p>
              Bandeaux cookies trompeurs, formulaires sans mention d'information, données revendues sans consentement,
              comptes impossibles à supprimer... Les abus sont fréquents et rarement sanctionnés.
            </p>
            <p className="font-medium text-foreground">
              Sans pression, rien ne change. Le RGPD s'applique exactement comme en métropole.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Ce que Wuvè Zyé fait</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {actionsColumns.map((column) => (
              <div key={column.title} className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <column.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{column.title}</h3>
                </div>
                <ul className="space-y-3">
                  {column.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-accent mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Baromètre Section */}
      <section id="barometre" className="py-16 lg:py-24 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Baromètre RGPD Martinique – V1
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Premier échantillon de {barometerData.sampleSize} sites martiniquais audités (collectivités, services
            publics, banques, télécoms, e-commerce). Dernière mise à jour :{" "}
            {new Date(barometerData.lastUpdate).toLocaleDateString("fr-FR")}.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-12">
            <StatCard
              label="Politique de confidentialité claire"
              value={100 - barometerData.stats.policyPresent}
              bad={true}
              prefix="% n'ont pas de"
            />
            <StatCard
              label="Cookies conformes"
              value={100 - barometerData.stats.cookieCompliant}
              bad={true}
              prefix="% ne permettent pas de refuser"
            />
            <StatCard
              label="Contact droits RGPD"
              value={100 - barometerData.stats.contactRights}
              bad={true}
              prefix="% n'indiquent aucun"
            />
            <StatCard label="Info formulaires" value={barometerData.stats.formInfo} bad={false} prefix="% ont une" />
            <StatCard
              label="Sites avec traceurs tiers"
              value={barometerData.stats.thirdPartyTrackers}
              bad={true}
              prefix="% utilisent des"
            />
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">Comment on évalue ?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {barometerData.criteria.map((criterion) => (
                  <li key={criterion.id} className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <div>
                      <span className="font-medium text-foreground">{criterion.name}</span>
                      <span className="text-muted-foreground"> — {criterion.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Se défendre Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Vous avez des droits. Utilisez-les.
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Utilisez nos modèles de lettres pour exercer vos droits. C'est gratuit, légal, et efficace.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {letterTypes.map((letter) => (
              <Card key={letter.title} className="h-full transition-all hover:shadow-lg hover:border-primary/50 group">
                <CardHeader>
                  <letter.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">{letter.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">{letter.description}</CardDescription>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground bg-transparent border-primary text-primary"
                  >
                    <Link href={letter.href}>
                      Voir le modèle <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Actions collectives RGPD Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Ensemble, on pèse plus lourd
          </h2>
          <Card className="max-w-2xl mx-auto border-dashed border-2">
            <CardContent className="py-12 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">
                Aucun dossier collectif RGPD ouvert pour l'instant.
                <br />
                Tu subis un abus numérique qui touche beaucoup de monde ? Signale-le nous.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/probleme?type=numerique">Proposer un dossier</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto border-2 border-primary bg-background">
            <CardHeader className="text-center pb-4">
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-2xl text-foreground">Soutenir les audits RGPD Péyi-a</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Vos dons financent les audits techniques : outils d'analyse spécialisés, experts informatiques
                indépendants, et enquêtes approfondies sur les sites et services locaux qui ne respectent pas vos
                données.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-bold">
                <Link href="/adhesion-et-dons">Faire un don pour les actions numériques</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

function StatCard({
  label,
  value,
  bad,
  prefix,
}: {
  label: string
  value: number
  bad: boolean
  prefix?: string
}) {
  const colorClass = bad ? "text-primary" : "text-accent"

  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <p className={`text-3xl font-bold ${colorClass}`}>{value}%</p>
        <p className="text-xs text-muted-foreground mt-2">
          {prefix ? `${prefix} ` : ""}
          {label}
        </p>
      </CardContent>
    </Card>
  )
}
