import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

const footerLinks = [
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "Politique de confidentialité", href: "/politique-confidentialite" },
  { name: "Contact", href: "/association#contact" },
]

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "TikTok", href: "#", icon: TikTokIcon },
]

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Association Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Wuvè Zyé</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Association loi 1901 basée à Fort-de-France, Martinique.
              <br />
              Défense des consommateurs martiniquais et de la diaspora.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Liens utiles</h4>
            <nav className="flex flex-col gap-2" aria-label="Liens du pied de page">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Suivez-nous</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-white/70 hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} Wuvè Zyé. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
