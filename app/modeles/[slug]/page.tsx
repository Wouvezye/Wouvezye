"use client"

import { useState, useRef } from "react"
import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TEMPLATES_RGPD, fillTemplate, getTemplateBySlug } from "@/data/templates-rgpd"
import {
  Eye,
  Pencil,
  Trash2,
  ShieldOff,
  Clock,
  ArrowLeft,
  Copy,
  Check,
  Download,
  Lightbulb,
  FileText,
} from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Eye,
  Pencil,
  Trash2,
  ShieldOff,
  Clock,
}

export default function TemplatePage() {
  const params = useParams()
  const slug = params.slug as string
  const template = getTemplateBySlug(slug)

  const [values, setValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  if (!template) {
    notFound()
  }

  const IconComponent = iconMap[template.icon] || FileText
  const filledContent = fillTemplate(template, values)

  const handleInputChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(filledContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      if (textareaRef.current) {
        textareaRef.current.select()
        document.execCommand("copy")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  const handleDownload = () => {
    const blob = new Blob([filledContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lettre-${template.slug}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-background py-16 lg:py-20 border-b-4 border-primary">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />
        <div className="container mx-auto px-4 relative">
          <Link
            href="/modeles"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux modèles
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {template.article}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">{template.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">{template.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Remplissez vos informations</CardTitle>
                <CardDescription>
                  Complétez les champs ci-dessous pour personnaliser votre lettre. Les champs non remplis garderont les
                  crochets [EXEMPLE].
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {template.placeholders.map((placeholder) => (
                  <div key={placeholder.key} className="space-y-2">
                    <Label htmlFor={placeholder.key}>{placeholder.label}</Label>
                    {placeholder.type === "textarea" ? (
                      <Textarea
                        id={placeholder.key}
                        placeholder={placeholder.placeholder}
                        value={values[placeholder.key] || ""}
                        onChange={(e) => handleInputChange(placeholder.key, e.target.value)}
                        className="min-h-[100px]"
                      />
                    ) : (
                      <Input
                        id={placeholder.key}
                        type={placeholder.type === "email" ? "email" : "text"}
                        placeholder={placeholder.placeholder}
                        value={values[placeholder.key] || ""}
                        onChange={(e) => handleInputChange(placeholder.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-accent/50 bg-accent/5">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  <CardTitle className="text-lg">Conseils pratiques</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {template.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <Card className="sticky top-4">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg">Aperçu de votre lettre</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copié !" : "Copier"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
                    <Download className="h-4 w-4" />
                    Télécharger
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  ref={textareaRef}
                  value={filledContent}
                  readOnly
                  className="min-h-[500px] font-mono text-sm leading-relaxed bg-muted/50"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-xl font-bold text-foreground">Pas de réponse après un mois ?</h2>
            <p className="text-muted-foreground">
              Si l'entreprise ne répond pas dans le délai légal d'un mois, vous pouvez utiliser notre modèle de relance
              ou déposer une plainte auprès de la CNIL.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Link href="/modeles/relance">Modèle de relance</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/probleme?type=numerique">Signaler le problème</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
