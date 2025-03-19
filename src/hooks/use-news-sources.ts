import { useEffect, useState } from "react";
import { Article } from "@/types/article";
import { NewsQuery, fetchArticles } from "@/services/news-service";
import { usePreferences } from "@/context/preferences-context";

export function useNewsSources(initialQuery?: NewsQuery) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<NewsQuery>(initialQuery || {});
  const { preferences } = usePreferences();
  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchArticles(query, preferences);
        setArticles(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch articles."
        );
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, [query, preferences]);

  const updateQuery = (newQuery: Partial<NewsQuery>) => {
    setQuery((prevQuery) => {
      const updatedQuery = { ...prevQuery, ...newQuery };
      return updatedQuery;
    });
  };
  return {
    articles,
    isLoading,
    error,
    updateQuery,
    query,
  };
}
