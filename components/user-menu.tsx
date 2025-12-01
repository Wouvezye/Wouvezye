"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, BookOpen } from "lucide-react"

interface UserData {
  id: string
  email: string
  role: string
}

export function UserMenu() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json()
        setUser(data.user)
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    router.refresh()
  }

  if (isLoading) {
    return null
  }

  if (!user) {
    return (
      <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
        <Link href="/login">
          <User className="h-4 w-4" />
          Connexion
        </Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline max-w-[120px] truncate">{user.email}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="truncate">{user.email}</span>
            <span className="text-xs font-normal text-muted-foreground capitalize">{user.role.toLowerCase()}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link href="/admin/blog" className="cursor-pointer">
              <Settings className="h-4 w-4 mr-2" />
              Administration
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/blog" className="cursor-pointer">
            <BookOpen className="h-4 w-4 mr-2" />
            Blog membres
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
