import axios from 'axios';
import { API_KEYS } from '@/lib/constants';
import { Article } from '@/types/article';
import { NewsApiResponse } from '@/types/api-responses';

export async function fetchFromNewsApi(
  query: string = '',
  category: string = '',
  fromDate: string = '',
  toDate: string = '',
  sources: string[] = [],
  page: number = 1
): Promise<Article[]> {
  try {
    const sourceString = sources.length > 0 ? sources.join(',') : '';
    
    const response = await axios.get<NewsApiResponse>('https://newsapi.org/v2/everything', {
      params: {
        q: query || 'news',
        from: fromDate,
        to: toDate,
        sources: sourceString,
        language: 'en',
        sortBy: 'publishedAt',
        apiKey: API_KEYS.NEWSAPI,
        page,
        pageSize: 20,
      },
    });

    return response.data.articles.map(article => ({
      id: article.url,
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      image: article.urlToImage,
      source: {
        id: article.source.id || 'newsapi',
        name: article.source.name,
      },
      author: article.author,
      publishedAt: article.publishedAt,
      category: category || 'general',
    }));
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return [];
  }
}