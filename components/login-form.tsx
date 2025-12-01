"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

type Step = "email" | "code" | "success"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect") || "/"

  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [devCode, setDevCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue")
        return
      }

      // For demo, show the code
      if (data._devCode) {
        setDevCode(data._devCode)
      }

      setStep("code")
    } catch {
      setError("Impossible de contacter le serveur")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Code invalide")
        return
      }

      setStep("success")

      // Redirect after short delay
      setTimeout(() => {
        router.push(redirectUrl)
        router.refresh()
      }, 1500)
    } catch {
      setError("Impossible de vérifier le code")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">
          {step === "email" && "Connexion"}
          {step === "code" && "Vérification"}
          {step === "success" && "Connecté !"}
        </CardTitle>
        <CardDescription>
          {step === "email" && "Entrez votre adresse e-mail pour recevoir un code de connexion."}
          {step === "code" && `Un code à 6 chiffres a été envoyé à ${email}`}
          {step === "success" && "Vous allez être redirigé..."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Demo code display */}
        {devCode && step === "code" && (
          <Alert className="mb-4 border-accent bg-accent/10">
            <CheckCircle className="h-4 w-4 text-accent" />
            <AlertDescription>
              <span className="font-medium">Mode démo :</span> Votre code est{" "}
              <code className="font-mono font-bold text-accent">{devCode}</code>
            </AlertDescription>
          </Alert>
        )}

        {step === "email" && (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Recevoir un code
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Code à 6 chiffres</Label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                required
                autoComplete="one-time-code"
                autoFocus
                className="text-center text-2xl tracking-widest font-mono"
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={isLoading || code.length !== 6}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Vérification...
                </>
              ) : (
                <>
                  Valider
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => {
                setStep("email")
                setCode("")
                setDevCode(null)
                setError(null)
              }}
            >
              Modifier l'adresse e-mail
            </Button>
          </form>
        )}

        {step === "success" && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <p className="text-muted-foreground">Redirection en cours...</p>
          </div>
        )}
      </CardContent>

      {step === "email" && (
        <CardFooter className="flex flex-col gap-4 border-t pt-6">
          <p className="text-sm text-muted-foreground text-center">
            Pas encore membre ?{" "}
            <Link href="/adhesion-et-dons" className="text-primary hover:underline font-medium">
              Rejoignez Wuvè Zyé
            </Link>
          </p>
        </CardFooter>
      )}
    </Card>
  )
}
