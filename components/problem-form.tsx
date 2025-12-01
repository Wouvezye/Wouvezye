"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Upload } from "lucide-react"

const problemTypes = [
  { value: "facture", label: "Facture / service" },
  { value: "logement", label: "Logement" },
  { value: "achat", label: "Achat / livraison" },
  { value: "numerique", label: "Numérique / RGPD" },
  { value: "autre", label: "Autre" },
]

const residenceOptions = [
  { value: "martinique", label: "Martinique" },
  { value: "guadeloupe", label: "Guadeloupe" },
  { value: "hexagone", label: "France hexagonale" },
  { value: "autre", label: "Autre" },
]

export function ProblemForm() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get("type") || ""

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    type: initialType,
    residence: "",
    description: "",
    amount: "",
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to a backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="border-primary/50">
        <CardContent className="py-12 text-center">
          <CheckCircle className="h-16 w-16 text-accent mx-auto mb-6" />
          <CardTitle className="text-xl mb-4">Demande envoyée</CardTitle>
          <CardDescription className="text-base leading-relaxed max-w-md mx-auto">
            Merci pour ta confiance. On analyse ton dossier et on te recontacte rapidement.
            <br />
            <br />
            <strong>Note :</strong> Les délais de réponse dépendent de notre charge. Les adhérents sont traités en
            priorité.
          </CardDescription>
          <Button
            variant="outline"
            className="mt-8 bg-transparent border-primary text-primary hover:bg-primary/10"
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                type: "",
                residence: "",
                description: "",
                amount: "",
                lastName: "",
                firstName: "",
                email: "",
                phone: "",
              })
            }}
          >
            Soumettre un autre problème
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ton problème</CardTitle>
          <CardDescription>Décris ta situation le plus précisément possible.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="type">Type de problème *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              required
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionne une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {problemTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="residence">Lieu de résidence *</Label>
            <Select
              value={formData.residence}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, residence: value }))}
              required
            >
              <SelectTrigger id="residence">
                <SelectValue placeholder="Où habites-tu ?" />
              </SelectTrigger>
              <SelectContent>
                {residenceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description du problème *</Label>
            <Textarea
              id="description"
              placeholder="Explique ce qui s'est passé, avec qui, quand, et ce que tu as déjà tenté..."
              className="min-h-32"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Montant concerné (facultatif)</Label>
            <Input
              id="amount"
              type="text"
              placeholder="Ex: 150€"
              value={formData.amount}
              onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Pièces jointes (facultatif)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Glisse tes fichiers ici ou clique pour sélectionner</p>
              <p className="text-xs text-muted-foreground mt-1">Factures, courriers, captures d'écran...</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tes coordonnées</CardTitle>
          <CardDescription>Pour qu'on puisse te recontacter.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Ton nom"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Ton prénom"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="ton.email@exemple.com"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone (facultatif)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0696 XX XX XX"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 font-bold">
          Envoyer ma demande
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          En soumettant ce formulaire, tu acceptes que Wuvè Zyé traite tes données pour analyser ton dossier. Consulte
          notre{" "}
          <a href="/politique-confidentialite" className="underline hover:text-primary">
            politique de confidentialité
          </a>
          .
        </p>
      </div>
    </form>
  )
}
