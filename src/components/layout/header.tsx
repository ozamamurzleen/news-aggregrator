"use client"
import Link from "next/link"
import { Newspaper, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { useNewsSources } from "@/hooks/use-news-sources"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { updateQuery } = useNewsSources({ page: 1 })

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      updateQuery({ query: searchQuery, page: 1 }) // ✅ Update query state
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="bg-background border-b sticky top-0 z-10 shadow-sm backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-primary flex items-center gap-2 transition-colors hover:text-primary/90"
          >
            <Newspaper className="h-6 w-6" />
            <span>NewsAggregator</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="w-full md:w-1/3 flex relative group">
          <Input
            type="search"
            placeholder="Search news..."
            className="flex-1 pr-10 border-muted-foreground/20 focus-visible:ring-primary/30 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full text-muted-foreground hover:text-foreground hover:bg-transparent"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
          >
            Feed
          </Link>
        </nav>
      </div>
    </header>
  )
}
