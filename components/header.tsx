"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, CreditCard, Package, Shield, FileText, Users, Heart, ChevronRight } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/components/language-context"

// Mega menu structure
const megaMenuItems = {
  fights: [
    {
      title: "Télécoms & banques",
      description: "Factures abusives, frais cachés, résiliations",
      href: "/nos-combats#telecoms-banques",
      icon: CreditCard,
    },
    {
      title: "E-commerce & livraisons",
      description: "Colis perdus, remboursements, arnaques",
      href: "/nos-combats#ecommerce-livraisons",
      icon: Package,
    },
    {
      title: "Données perso & RGPD",
      description: "Vos droits numériques, audits, actions",
      href: "/nos-combats#donnees-rgpd",
      icon: Shield,
    },
  ],
  actions: [
    {
      title: "Actions en cours",
      description: "Rejoignez les dossiers ouverts",
      href: "/actions-collectives",
      icon: Users,
    },
    {
      title: "RGPD Péyi-a",
      description: "Baromètre et audits numériques",
      href: "/rgpd-peyi-a",
      icon: Shield,
    },
    {
      title: "Signaler un problème",
      description: "Formulaire de signalement",
      href: "/probleme",
      icon: FileText,
    },
  ],
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-900 dark:bg-zinc-950 text-white border-b border-zinc-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold text-white">Wuvè Zyé</span>
        </Link>

        {/* Desktop Navigation with Mega Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none">
                  {t("nav.home")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Nos combats mega menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white/80 hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10">
                {t("nav.fights")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[500px] p-4">
                  <div className="grid gap-3">
                    {megaMenuItems.fights.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-start gap-3 rounded-lg p-3 hover:bg-muted transition-colors"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                        <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Link
                      href="/nos-combats"
                      className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      Voir tous nos combats
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Actions mega menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white/80 hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10">
                {t("nav.actions")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[450px] p-4">
                  <div className="grid gap-3">
                    {megaMenuItems.actions.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-start gap-3 rounded-lg p-3 hover:bg-muted transition-colors"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                        <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none">
                  {t("nav.blog")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/association" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none">
                  {t("nav.association")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
          <UserMenu />
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold ml-2">
            <Link href="/adhesion-et-dons">
              <Heart className="h-4 w-4 mr-2" />
              {t("nav.donate")}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Ouvrir le menu" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[350px] bg-zinc-900 dark:bg-zinc-950 text-white border-zinc-800"
            >
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/" className="text-xl font-bold text-white" onClick={() => setOpen(false)}>
                  Wuvè Zyé
                </Link>

                <nav className="flex flex-col gap-1" aria-label="Navigation mobile">
                  <Link
                    href="/"
                    className="text-base font-medium text-white/80 py-2 transition-colors hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {t("nav.home")}
                  </Link>

                  {/* Nos combats section */}
                  <div className="py-2">
                    <p className="text-xs uppercase tracking-wider text-white/50 mb-2">{t("nav.fights")}</p>
                    {megaMenuItems.fights.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 py-2 pl-2 text-sm text-white/70 hover:text-white transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <item.icon className="h-4 w-4 text-primary" />
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  {/* Actions section */}
                  <div className="py-2">
                    <p className="text-xs uppercase tracking-wider text-white/50 mb-2">{t("nav.actions")}</p>
                    {megaMenuItems.actions.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 py-2 pl-2 text-sm text-white/70 hover:text-white transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <item.icon className="h-4 w-4 text-primary" />
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/blog"
                    className="text-base font-medium text-white/80 py-2 transition-colors hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {t("nav.blog")}
                  </Link>
                  <Link
                    href="/association"
                    className="text-base font-medium text-white/80 py-2 transition-colors hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {t("nav.association")}
                  </Link>
                </nav>

                <div className="pt-4 border-t border-white/10">
                  <UserMenu />
                </div>

                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold w-full">
                  <Link href="/adhesion-et-dons" onClick={() => setOpen(false)}>
                    <Heart className="h-4 w-4 mr-2" />
                    {t("nav.donate")}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
