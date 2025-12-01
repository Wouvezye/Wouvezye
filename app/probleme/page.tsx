import { Suspense } from "react"
import { ProblemForm } from "@/components/problem-form"

export default function ProblemPage() {
  return (
    <div className="py-16 lg:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">J'ai un problème</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Explique ton problème. On te dira ce qu'on peut faire, ce qui est gratuit, et ce qui nécessite d'adhérer.
            Pas de blabla, que du concret.
          </p>

          <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
            <ProblemForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
