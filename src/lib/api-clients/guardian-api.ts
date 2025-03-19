import axios from 'axios';
import { API_KEYS } from '@/lib/constants';
import { Article } from '@/types/article';
import { GuardianApiResponse } from '@/types/api-responses';

export async function fetchFromGuardian(
  query: string = '',
  category: string = '',
  fromDate: string = '',
  toDate: string = '',
  page: number = 1
): Promise<Article[]> {
  try {
    const response = await axios.get<GuardianApiResponse>('https://content.guardianapis.com/search', {
      params: {
        q: query,
        section: category || undefined,
        'from-date': fromDate || undefined,
        'to-date': toDate || undefined,
        page,
        'page-size': 20,
        'show-fields': 'thumbnail,bodyText',
        'api-key': API_KEYS.GUARDIAN,
      },
    });

    return response.data.response.results.map(item => ({
      id: item.id,
      title: item.webTitle,
      description: item.fields?.bodyText?.substring(0, 200) + '...' || '',
      url: item.webUrl,
      image: item.fields?.thumbnail,
      source: {
        id: 'guardian',
        name: 'The Guardian',
      },
      publishedAt: item.webPublicationDate,
      category: item.sectionName.toLowerCase(),
    }));
  } catch (error) {
    console.error('Error fetching from Guardian API:', error);
    return [];
  }
}