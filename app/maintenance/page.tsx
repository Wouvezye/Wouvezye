"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, Mail, Send, Check, AlertCircle, Shield, LogIn } from "lucide-react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string // Anti-spam honeypot field
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function MaintenancePage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis"
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Le sujet doit contenir au moins 5 caractères"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis"
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Le message doit contenir au moins 20 caractères"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      setSubmitStatus("success")
      setSubmitMessage("Message envoyé avec succès !")
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact/maintenance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          timestamp: Date.now(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setSubmitMessage("Votre message a bien été envoyé. Nous vous répondrons dès que possible.")
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" })
      } else {
        setSubmitStatus("error")
        setSubmitMessage(data.error || "Une erreur est survenue. Veuillez réessayer.")
      }
    } catch {
      setSubmitStatus("error")
      setSubmitMessage("Impossible de contacter le serveur. Veuillez réessayer plus tard.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">Wuvè Zyé</span>
            </div>
            {/* Admin Login Button */}
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link href="/login?redirect=/admin">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Connexion admin</span>
                <span className="sm:hidden">Connexion</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Maintenance Notice */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-6">
              <Wrench className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Site en maintenance</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nous effectuons actuellement des travaux de maintenance pour améliorer nos services. Le site sera de
              nouveau accessible très prochainement.
            </p>
          </div>

          {/* Contact Form */}
          <Card className="border-2">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle>Nous contacter</CardTitle>
              </div>
              <CardDescription>
                Vous avez une question urgente ? Utilisez ce formulaire pour nous joindre pendant la maintenance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">Message envoyé !</p>
                  <p className="text-muted-foreground">{submitMessage}</p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setSubmitStatus("idle")
                      setSubmitMessage("")
                    }}
                  >
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - hidden from users, visible to bots */}
                  <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                    <Label htmlFor="honeypot">Ne pas remplir</Label>
                    <Input
                      id="honeypot"
                      name="honeypot"
                      type="text"
                      value={formData.honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Nom <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? "border-red-500" : ""}
                        disabled={isSubmitting}
                      />
                      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-red-500" : ""}
                        disabled={isSubmitting}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Sujet <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Objet de votre message"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? "border-red-500" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-primary">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre demande en détail..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                    />
                    {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                  </div>

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm">{submitMessage}</p>
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Envoyer le message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Vous pouvez aussi nous contacter directement par email :</p>
            <a href="mailto:wuvezye@gmail.com" className="text-primary hover:underline font-medium">
              wuvezye@gmail.com
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Wuvè Zyé. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
