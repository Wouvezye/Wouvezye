import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Mail, Phone, Users, Target, Shield, Flame } from "lucide-react"

const teamMembers = [
  {
    name: "À définir",
    role: "Président(e)",
    description: "Coordination générale et représentation",
  },
  {
    name: "À définir",
    role: "Secrétaire",
    description: "Gestion administrative et suivi des dossiers",
  },
  {
    name: "À définir",
    role: "Trésorier(e)",
    description: "Gestion financière et adhésions",
  },
  {
    name: "À définir",
    role: "Responsable numérique",
    description: "Coordination des audits RGPD Péyi-a",
  },
]

const missionPoints = [
  {
    icon: Shield,
    title: "Défendre",
    description: "Accompagner les consommateurs martiniquais face aux abus des professionnels.",
  },
  {
    icon: Target,
    title: "Informer",
    description: "Produire des guides, alertes et ressources pour connaître ses droits.",
  },
  {
    icon: Users,
    title: "Agir collectivement",
    description: "Lancer des actions groupées quand un problème touche plusieurs personnes.",
  },
]

export default function AssociationPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-muted/50 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">L'association</h1>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Wuvè Zyé est une association loi 1901 de défense des consommateurs, basée à Fort-de-France, en Martinique.
              Militante, indépendante, et financée uniquement par ses adhérents et donateurs.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Notre histoire</h2>
            <p className="text-muted-foreground leading-relaxed">
              Wuvè Zyé — "ouvrir les yeux" en créole martiniquais — est née d'un constat simple : trop de consommateurs
              en Martinique subissent des abus sans savoir comment se défendre. Factures abusives, services défaillants,
              données personnelles mal protégées... les problèmes sont nombreux et les recours souvent méconnus.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Face à ce constat, un groupe de citoyens engagés a décidé de créer une association capable d'informer,
              d'accompagner et d'agir. Pas un "service client bis", mais une structure militante qui n'hésite pas à
              mettre la pression sur les entreprises qui abusent.
            </p>
            <p className="text-foreground font-medium leading-relaxed">
              Notre indépendance est totale : nous ne recevons aucun financement des entreprises que nous surveillons.
              Seuls les adhérents et les donateurs financent nos actions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-zinc-900 dark:bg-zinc-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="h-8 w-8 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Notre esprit : mawonerie moderne</h2>
            </div>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              On vient d'une histoire où, quand tout était verrouillé, les gens se mettaient an mawon pour survivre et
              résister. Wuvè Zyé reprend cet esprit, version 2025.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <strong className="text-white">On ne subit pas.</strong>
                  <span className="text-white/70">
                    {" "}
                    On documente, on agit, on ne laisse pas les abus sous le tapis.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <strong className="text-white">On contourne les blocages.</strong>
                  <span className="text-white/70">
                    {" "}
                    Médias locaux silencieux ? On passe par nos propres canaux et par la diaspora.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <strong className="text-white">On organise la défense collective.</strong>
                  <span className="text-white/70">
                    {" "}
                    Comme les camps marrons, on met en commun les infos, les preuves et les stratégies — dans le cadre
                    de la loi, mais sans complaisance.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-12">Notre mission</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {missionPoints.map((point) => (
              <div key={point.title} className="text-center">
                <point.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Notre équipe</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            L'association est gérée par un bureau élu et des bénévoles engagés.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.role}>
                <CardHeader className="pb-2">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base text-center">{member.name}</CardTitle>
                  <CardDescription className="text-center font-medium text-primary">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-12">Où nous trouver</h2>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl">
            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Adresse</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Wuvè Zyé</p>
                <p>Fort-de-France</p>
                <p>97200 Martinique</p>
                <p className="text-xs mt-2">(Adresse exacte communiquée aux adhérents)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Permanences</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Mardi : 14h - 17h</p>
                <p>Jeudi : 9h - 12h</p>
                <p className="text-xs mt-2">(Sur rendez-vous pour les dossiers complexes)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-12">Nous contacter</h2>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl">
            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:wuvezye@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  wuvezye@gmail.com
                </a>
              </CardContent>
            </Card>
            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
                <a href="tel:+596596000000" className="text-muted-foreground hover:text-primary transition-colors">
                  0596 XX XX XX
                </a>
                <p className="text-xs text-muted-foreground mt-1">(Aux heures de permanence)</p>
              </CardContent>
            </Card>
            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Signaler un litige</h3>
                <p className="text-muted-foreground text-sm mb-3">Utilise notre formulaire en ligne.</p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  <Link href="/probleme">J'ai un problème</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
