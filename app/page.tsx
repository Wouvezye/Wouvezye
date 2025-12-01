"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileText, Home, Package, Shield, Users, Megaphone, BookOpen, Flame } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { ArticlesSection } from "@/components/articles-section"

// Composant pour la mention "image générée"
function GeneratedLabel() {
  return (
    <span className="pointer-events-none absolute bottom-2 right-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/70">
      image générée
    </span>
  )
}

export default function HomePage() {
  const { t } = useLanguage()

  const problemCards = [
    {
      icon: FileText,
      titleKey: "problems.invoice.title",
      descriptionKey: "problems.invoice.description",
      footerKey: "problems.invoice.footer",
      href: "/probleme?type=facture",
    },
    {
      icon: Home,
      titleKey: "problems.housing.title",
      descriptionKey: "problems.housing.description",
      footerKey: "problems.housing.footer",
      href: "/probleme?type=logement",
    },
    {
      icon: Package,
      titleKey: "problems.purchase.title",
      descriptionKey: "problems.purchase.description",
      footerKey: "problems.purchase.footer",
      href: "/probleme?type=achat",
    },
    {
      icon: Shield,
      titleKey: "problems.data.title",
      descriptionKey: "problems.data.description",
      footerKey: "problems.data.footer",
      href: "/probleme?type=numerique",
    },
  ]

  const actionsData = [
    {
      titleKey: "actions.inform.title",
      icon: BookOpen,
      itemKeys: ["actions.inform.item1", "actions.inform.item2", "actions.inform.item3"],
    },
    {
      titleKey: "actions.support.title",
      icon: Users,
      itemKeys: ["actions.support.item1", "actions.support.item2", "actions.support.item3"],
    },
    {
      titleKey: "actions.act.title",
      icon: Megaphone,
      itemKeys: ["actions.act.item1", "actions.act.item2", "actions.act.item3"],
    },
  ]

  const membershipTypes = [
    { nameKey: "membership.local", descKey: "membership.local.desc", price: "20€/an" },
    { nameKey: "membership.solidarity", descKey: "membership.solidarity.desc", price: "10€/an" },
    { nameKey: "membership.diaspora", descKey: "membership.diaspora.desc", price: "30€/an" },
    { nameKey: "membership.support", descKey: "membership.support.desc", price: "50€/an" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-background py-12 lg:py-24 border-b-4 border-primary">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />
        <div className="container mx-auto px-4 relative">
          <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
            {/* Image - Mobile: en haut, Desktop: à droite */}
            <div className="mb-6 md:mb-0 md:order-2">
              <div className="relative overflow-hidden rounded-2xl border border-red-700/40">
                <Image
                  src="/images/wuvezye/hero-consommatrice.png"
                  alt="Femme martiniquaise déterminée dans une rue de Fort-de-France"
                  width={960}
                  height={640}
                  className="h-64 md:h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <GeneratedLabel />
              </div>
            </div>
            {/* Texte - Mobile: en bas, Desktop: à gauche */}
            <div className="md:order-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                {t("hero.title")}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
                {t("hero.subtitle")}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg"
                >
                  <Link href="/probleme">{t("hero.cta.problem")}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent font-bold rounded-lg"
                >
                  <Link href="/actions-collectives">{t("hero.cta.action")}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent font-bold rounded-lg"
                >
                  <Link href="/adhesion-et-dons">{t("hero.cta.member")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mawonerie Section */}
      <section className="py-16 lg:py-20 bg-zinc-900 dark:bg-zinc-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/20">
                <Flame className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-balance">{t("mawonerie.title")}</h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8 text-pretty">
              {t("mawonerie.text")}
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <Link href="/adhesion-et-dons">{t("mawonerie.cta")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">{t("problems.title")}</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {t("problems.subtitle")}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {problemCards.map((card) => (
              <Link key={card.titleKey} href={card.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer group border-t-4 border-t-primary">
                  <CardHeader>
                    <card.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-lg">{t(card.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">{t(card.descriptionKey)}</CardDescription>
                    <p className="mt-4 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      → {t(card.footerKey)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            {t("actions.title")}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {t("actions.subtitle")}
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {actionsData.map((action) => (
              <div key={action.titleKey} className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <action.icon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">{t(action.titleKey)}</h3>
                </div>
                <ul className="space-y-3">
                  {action.itemKeys.map((itemKey) => (
                    <li key={itemKey} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{t(itemKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collective Actions Teaser */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            {t("collective.title")}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {t("collective.subtitle")}
          </p>
          {/* Layout 2 colonnes sur md+ */}
          <div className="max-w-5xl mx-auto md:flex md:items-center md:gap-8">
            {/* Image de réunion */}
            <div className="mb-6 md:mb-0 md:w-1/2">
              <div className="relative overflow-hidden rounded-2xl border border-red-700/50">
                <Image
                  src="/images/wuvezye/action-collective-reunion.png"
                  alt="Réunion d'action collective entre plusieurs personnes afro-descendantes autour d'une table"
                  width={960}
                  height={640}
                  className="h-64 w-full object-cover md:h-80"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <GeneratedLabel />
              </div>
            </div>
            {/* Carte exemple */}
            <div className="md:w-1/2 md:pl-4">
              <Card className="border-2 border-dashed border-border">
                <CardHeader>
                  <CardTitle className="text-lg">{t("collective.example.title")}</CardTitle>
                  <CardDescription>
                    {t("collective.example.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{t("collective.example.progress")}</span>
                      <span className="font-medium">12 / 50</span>
                    </div>
                    <Progress value={24} className="h-2 [&>div]:bg-accent" />
                  </div>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href="/actions-collectives">{t("collective.example.cta")}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              <Link href="/actions-collectives">{t("collective.viewAll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            {t("membership.title")}
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {t("membership.subtitle")}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {membershipTypes.map((type) => (
              <Card key={type.nameKey} className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{t(type.nameKey)}</CardTitle>
                  <CardDescription className="text-xs">{t(type.descKey)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{type.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-bold">
              <Link href="/adhesion-et-dons">{t("membership.cta")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <ArticlesSection />

      {/* Digital Actions Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Layout 2 colonnes sur md+ */}
          <div className="max-w-5xl mx-auto md:flex md:items-center md:gap-8">
            {/* Image audit numérique */}
            <div className="mb-6 md:mb-0 md:w-1/2">
              <div className="relative overflow-hidden rounded-2xl border border-red-700/50">
                <Image
                  src="/images/wuvezye/audit-numerique-ecran.png"
                  alt="Petit groupe regardant un rapport d'audit sur un écran d'ordinateur"
                  width={960}
                  height={640}
                  className="h-64 w-full object-cover md:h-80"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <GeneratedLabel />
              </div>
            </div>
            {/* Carte texte */}
            <div className="md:w-1/2 md:pl-4">
              <Card className="border-2 border-primary bg-muted/30">
                <CardHeader className="text-center pb-4">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-2xl text-foreground">{t("digital.title")}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {t("digital.text")}
                  </p>
                  <p className="font-semibold text-foreground">
                    {t("digital.warning")}
                  </p>
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-bold">
                    <Link href="/adhesion-et-dons">{t("digital.cta")}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
