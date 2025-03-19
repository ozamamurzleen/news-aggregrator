import type { Article } from "@/types/article"
import { ArticleCard } from "./article-card"
import { Skeleton } from "@/components/ui/skeleton"

interface NewsGridProps {
  articles: Article[]
  isLoading?: boolean
}

export function NewsGrid({ articles, isLoading = false }: NewsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <NewsGridSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}

function NewsGridSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden flex flex-col h-full shadow-sm bg-card animate-pulse">
      <Skeleton className="h-48 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </Skeleton>
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-6 w-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </Skeleton>
          <Skeleton className="h-6 w-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </Skeleton>
        </div>
        <Skeleton className="h-8 w-full mb-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </Skeleton>
        <Skeleton className="h-4 w-full mb-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </Skeleton>
        <Skeleton className="h-4 w-full mb-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </Skeleton>
        <Skeleton className="h-4 w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </Skeleton>
      </div>
    </div>
  )
}

