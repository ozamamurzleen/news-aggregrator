"use client"
import { useEffect, useState } from "react"
import { NewsGrid } from "@/components/news/news-grid"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Article } from "@/types/article"
import { useNewsSources } from "@/hooks/use-news-sources"
import { NEWS_CATEGORIES } from "@/lib/constants"
import EmptyState from "@/components/news/empty-state"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Clock, ExternalLink, Filter, Newspaper } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import * as React from "react";

export default function Home() {
  const { articles, isLoading, error } = useNewsSources({ page: 1 })
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null)
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])

  useEffect(() => {
    if (articles.length > 0) {
      const articleWithImage = articles.find((article) => article.image)
      setFeaturedArticle(articleWithImage || articles[0])
    }
  }, [articles])

  useEffect(() => {
    if (activeCategoryId) {
      setFilteredArticles(articles.filter((article) => article.category?.toLowerCase() === activeCategoryId.toLowerCase()))
    } else {
      setFilteredArticles(articles)
    }
  }, [articles, activeCategoryId])

  const handleCategoryChange = (categoryId: string | null) => {
    setActiveCategoryId(categoryId)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 xl:w-3/4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 shadow-sm">
              <p className="font-medium">Error loading articles: {error}</p>
            </div>
          )}

          {isLoading && !featuredArticle ? (
            <FeaturedArticleSkeleton />
          ) : (
            featuredArticle && (
              <div className="relative rounded-xl overflow-hidden mb-8 shadow-md transition-all hover:shadow-lg group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${
                      featuredArticle.image || "https://placehold.co/1200x400?text=Featured+News"
                    })`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
                <div className="relative h-[300px] sm:h-[350px] md:h-[400px] flex flex-col justify-end p-6 text-white">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      {featuredArticle.source.name}
                    </Badge>
                    {featuredArticle.category && (
                      <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                        {featuredArticle.category}
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
                    {featuredArticle.title}
                  </h1>
                  <p className="mb-4 text-white/80 line-clamp-2 text-sm md:text-base">{featuredArticle.description}</p>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center text-white/70 text-sm gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDistanceToNow(new Date(featuredArticle.publishedAt), { addSuffix: true })}</span>
                    </div>
                  </div>
                  <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button className="gap-2 group-hover:bg-primary/90">
                      Read Full Article
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            )
          )}

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Latest News</h2>
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Filter className="h-4 w-4 mr-1" />
                  <span>Filter by category</span>
                </div>
                <Select
                  value={activeCategoryId || "all"}
                  onValueChange={(value) => handleCategoryChange(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-[180px] bg-muted/40 hover:bg-muted/60 transition-colors">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {NEWS_CATEGORIES.map((category, index) => (
                      <SelectItem key={index} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <NewsGrid articles={filteredArticles} isLoading={isLoading} />

            {filteredArticles.length === 0 && !isLoading && <EmptyState />}
          </div>
        </div>

        <div className="lg:w-1/3 xl:w-1/4 lg:sticky lg:top-24 lg:self-start">
          <div className="bg-card rounded-xl shadow-sm p-4 border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ChevronRight className="h-5 w-5 text-primary" />
              Quick Navigation
            </h3>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturedArticleSkeleton() {
  return (
    <div className="relative rounded-xl overflow-hidden mb-8 shadow-md bg-muted h-[400px] animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-6 w-24 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </Skeleton>
          <Skeleton className="h-6 w-20 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </Skeleton>
        </div>
        <Skeleton className="h-10 w-full max-w-2xl mb-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </Skeleton>
        <Skeleton className="h-10 w-full max-w-xl mb-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </Skeleton>
        <Skeleton className="h-6 w-full max-w-lg mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </Skeleton>
        <Skeleton className="h-10 w-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </Skeleton>
      </div>
    </div>
  )
}
