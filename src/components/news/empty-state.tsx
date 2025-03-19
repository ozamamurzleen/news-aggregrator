import { Newspaper } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 flex flex-col items-center space-y-4">
        <div className="rounded-full bg-muted p-6">
          <Newspaper className="h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold tracking-tight">No articles found</h3>
          <p className="text-muted-foreground max-w-[250px] mx-auto">
            Try selecting a different category or check back later for new content.
          </p>
        </div>
      </div>
    </div>
  )
}

