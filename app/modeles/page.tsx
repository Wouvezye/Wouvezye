import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TEMPLATES_RGPD } from "@/data/templates-rgpd"
import { Eye, Pencil, Trash2, ShieldOff, Clock, ArrowRight, FileText, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Modèles de lettres RGPD – Exercez vos droits",
  description:
    "Modèles de lettres gratuits pour exercer vos droits RGPD : accès, rectification, effacement, opposition. Prêts à l'emploi pour les consommateurs martiniquais.",
  keywords: ["RGPD", "modèles lettres", "droits données", "Martinique", "protection données", "CNIL"],
  openGraph: {
    title: "Modèles de lettres RGPD – Wuvè Zyé",
    description: "Modèles de lettres gratuits pour exercer vos droits RGPD en Martinique.",
    type: "website",
  },
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Eye,
  Pencil,
  Trash2,
  ShieldOff,
  Clock,
}

export default function ModelesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-background py-20 lg:py-28 border-b-4 border-primary">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <p className="text-primary font-bold">Outils RGPD</p>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
              Modèles de lettres RGPD
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Exercez vos droits facilement avec nos modèles prêts à l'emploi. Gratuit, légal, efficace.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Le RGPD vous donne des droits</h2>
            <p className="text-muted-foreground leading-relaxed">
              Depuis 2018, le Règlement Général sur la Protection des Données vous permet de contrôler vos données
              personnelles. Toute entreprise ou administration doit répondre à vos demandes dans un délai d'un mois.
              Utilisez ces modèles pour faire valoir vos droits.
            </p>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES_RGPD.map((template) => {
              const IconComponent = iconMap[template.icon] || FileText
              return (
                <Card
                  key={template.id}
                  className="h-full transition-all hover:shadow-lg hover:border-primary/50 group flex flex-col"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{template.article}</span>
                    </div>
                    <CardTitle className="text-xl">{template.shortTitle}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="text-sm leading-relaxed flex-1">{template.description}</CardDescription>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground bg-transparent border-primary text-primary"
                    >
                      <Link href={`/modeles/${template.slug}`}>
                        Utiliser ce modèle <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto border-2 border-primary bg-background">
            <CardContent className="py-12 text-center space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Besoin d'aide personnalisée ?</h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Si vous avez un problème complexe avec une entreprise qui ne respecte pas vos droits numériques,
                contactez-nous. Nos bénévoles peuvent vous accompagner dans vos démarches.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-bold">
                  <Link href="/probleme?type=numerique">Signaler un problème</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Link href="/rgpd-peyi-a">Voir le baromètre RGPD</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
