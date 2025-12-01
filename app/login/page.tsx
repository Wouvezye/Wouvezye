import { Suspense } from "react"
import { LoginForm } from "@/components/login-form"

export const metadata = {
  title: "Connexion – Wuvè Zyé",
  description: "Connectez-vous à votre espace membre Wuvè Zyé.",
}

export default function LoginPage() {
  return (
    <div className="bg-background min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Suspense fallback={<div className="text-center">Chargement...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
