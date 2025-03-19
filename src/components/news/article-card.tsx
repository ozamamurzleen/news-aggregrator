/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Article } from "@/types/article"
import { formatDistanceToNow } from "date-fns"
import { Clock, ExternalLink, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md border">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          {article.image ? (
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              className="object-cover h-full w-full transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/600x400?text=News"
              }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image available</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {article.source.name}
          </Badge>
          {article.category && (
            <Badge variant="outline" className="bg-muted/50 hover:bg-muted">
              {article.category}
            </Badge>
          )}
        </div>
        <h3 className="font-bold text-lg line-clamp-2 mb-3 leading-tight">{article.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{article.description}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center border-t mt-4 py-3">
        <div className="flex flex-col">
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <Clock className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
          {article.author && (
            <div className="flex items-center text-xs text-muted-foreground gap-1 mt-1">
              <User className="h-3 w-3" />
              <span>{article.author}</span>
            </div>
          )}
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary font-medium hover:underline flex items-center transition-colors hover:text-primary/80"
        >
          Read more <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </CardFooter>
    </Card>
  )
}

