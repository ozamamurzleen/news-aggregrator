import { usePreferences } from "@/context/preferences-context"
import { Button } from "@/components/ui/button"
import { CheckCircle, Settings, Rss } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function Sidebar() {
  const { preferences } = usePreferences()

  return (
    <aside className="bg-card rounded-lg border shadow-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Rss className="h-5 w-5 text-primary" />
          <h2 className="font-bold text-lg">Your News Feed</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">News tailored to your interests</p>

        <Separator className="my-4" />

        <div className="mb-6">
          <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">Your Sources</h3>
          <ul className="space-y-2">
            {preferences.sources.map((source) => (
              <li
                key={source}
                className="text-sm flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-muted group"
              >
                <CheckCircle className="h-4 w-4 text-primary group-hover:text-primary/80" />
                <span className="font-medium">{source}</span>
              </li>
            ))}
          </ul>
        </div>

        {preferences.categories && preferences.categories.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {preferences.categories.map((category) => (
                <Badge key={category} variant="outline" className="bg-muted/50 hover:bg-muted">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-4" />

        <Link href="/" className="block">
          <Button variant="default" className="w-full gap-2 cursor-pointer">
            <Settings className="h-4 w-4" />
            Customize Feed
          </Button>
        </Link>
      </div>
    </aside>
  )
}

