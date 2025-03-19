import { fetchFromNewsApi } from '@/lib/api-clients/news-api';
import { fetchFromGuardian } from '@/lib/api-clients/guardian-api';
import { fetchFromNYT } from '@/lib/api-clients/nyt-api';
import { Article } from '@/types/article';
import { UserPreferences } from '@/types/user';

export interface NewsQuery {
  query?: string;
  category?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  sources?: string[];
}

export async function fetchArticles(params: NewsQuery, preferences?: UserPreferences): Promise<Article[]> {
  const { query, category, fromDate, toDate, page = 1, sources } = params;
  const sourcesToUse = sources || preferences?.sources || ['newsapi', 'guardian', 'nyt'];
  const categoryToUse = category || '';
  const promises: Promise<Article[]>[] = [];

  if (sourcesToUse.includes('newsapi')) {
    promises.push(fetchFromNewsApi(query, categoryToUse, fromDate, toDate, [], page));
  }

  if (sourcesToUse.includes('guardian')) {
    promises.push(fetchFromGuardian(query, categoryToUse, fromDate, toDate, page));
  }

  if (sourcesToUse.includes('nyt')) {
    promises.push(fetchFromNYT(query, categoryToUse, fromDate, toDate, page));
  }

  const results = await Promise.all(promises);

  let articles = results.flat().sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  if (category && preferences?.categories && preferences.categories.length > 0) {
    articles = articles.filter(article => {
      const articleCategory = article.category?.toLowerCase();
      return articleCategory && preferences.categories.includes(articleCategory);
    });
  }

  if (preferences?.authors && preferences.authors.length > 0) {
    articles = articles.filter(article => {
      const articleAuthor = article.author?.toLowerCase();
      return articleAuthor && preferences.authors.some(author =>
        articleAuthor.includes(author.toLowerCase())
      );
    });
  }

  return articles;
}
