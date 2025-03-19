"use client";

import { useSearchParams } from "next/navigation";
import { NewsGrid } from "@/components/news/news-grid";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { useNewsSources } from "@/hooks/use-news-sources";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import { ArrowLeft, FileSearch, Search, SearchX } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SearchPage() {
  return (
    <Suspense fallback={<ArticleSkeleton count={6} />}>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  
  const { articles, isLoading, error, updateQuery } = useNewsSources({
    query: searchQuery,
    page: 1,
  });

  useEffect(() => {
    updateQuery({ query: searchQuery });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]); // Added updateQuery to dependency array

  return (
    <div key={searchQuery} className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 xl:w-3/4">
          <div className="mb-8">
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Search className="h-4 w-4" />
                <span className="text-sm">Search results</span>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {searchQuery ? (
                    <span>
                      Results for{" "}
                      <Badge
                        variant="outline"
                        className="ml-1 text-lg font-normal"
                      >
                        &quot;{searchQuery}&quot;
                      </Badge>
                    </span>
                  ) : (
                    "Search"
                  )}
                </h1>
                <Link href="/">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
              {articles.length > 0 && !isLoading && (
                <p className="text-muted-foreground">
                  Found {articles.length}{" "}
                  {articles.length === 1 ? "article" : "articles"}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 shadow-sm">
                <p className="font-medium">Error loading articles: {error}</p>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <ArticleSkeleton count={6} />
              </div>
            ) : (
              <>
                {articles.length > 0 ? (
                  <NewsGrid articles={articles} />
                ) : (
                  <div className="bg-muted/30 rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[300px] border border-dashed">
                    <div className="bg-muted rounded-full p-4 mb-4">
                      <SearchX className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      No articles found
                    </h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                      We couldn&apos;t find any articles matching
                      &quot;{searchQuery}&quot;. Try using different keywords or
                      check out our homepage.
                    </p>
                    <Link href="/">
                      <Button className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="lg:w-1/3 xl:w-1/4 lg:sticky lg:top-6 lg:self-start">
          <div className="bg-card rounded-xl shadow-sm p-4 border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileSearch className="h-5 w-5 text-primary" />
              Recent Searches
            </h3>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleSkeleton({ count = 1 }: { count?: number }) {
  const Skeleton = () => (
    <div className="border rounded-lg overflow-hidden flex flex-col h-full shadow-sm bg-card animate-pulse">
      <div className="h-48 w-full relative overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          <div className="h-6 w-20 relative overflow-hidden bg-muted rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
          <div className="h-6 w-16 relative overflow-hidden bg-muted rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        </div>
        <div className="h-8 w-full mb-2 relative overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
        <div className="h-4 w-full mb-1 relative overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
        <div className="h-4 w-full mb-1 relative overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
        <div className="h-4 w-3/4 relative overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted-foreground/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} />
      ))}
    </>
  );
}