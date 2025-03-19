import axios from 'axios';
import { API_KEYS } from '@/lib/constants';
import { Article } from '@/types/article';
import { NYTApiResponse } from '@/types/api-responses';

export async function fetchFromNYT(
  query: string = '',
  category: string = '',
  fromDate: string = '',
  toDate: string = '',
  page: number = 1
): Promise<Article[]> {
  try {
    const response = await axios.get<NYTApiResponse>(
      'https://api.nytimes.com/svc/search/v2/articlesearch.json',
      {
        params: {
          q: query,
          fq: category ? `section_name:${category}` : undefined,
          begin_date: fromDate ? fromDate.replace(/-/g, '') : undefined,
          end_date: toDate ? toDate.replace(/-/g, '') : undefined,
          page: page - 1, // NYT API is 0-indexed
          'api-key': API_KEYS.NYT,
        },
      }
    );

    return response.data.response.docs.map(doc => {
      const multimedia = doc.multimedia.find(m => m.type === 'image');
      const imageUrl = multimedia ? `https://www.nytimes.com/${multimedia.url}` : undefined;
      
      return {
        id: doc._id,
        title: doc.headline.main,
        description: doc.abstract,
        url: doc.web_url,
        image: imageUrl,
        source: {
          id: 'nyt',
          name: 'New York Times',
        },
        author: doc.byline.original?.replace('By ', '') || undefined,
        publishedAt: doc.pub_date,
        category: doc.section_name?.toLowerCase(),
      };
    });
  } catch (error) {
    console.error('Error fetching from NYT API:', error);
    return [];
  }
}