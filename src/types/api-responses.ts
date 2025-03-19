import { Article } from './article';
export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface GuardianApiResponse {
  response: {
    status: string;
    results: Array<{
      id: string;
      webTitle: string;
      webUrl: string;
      webPublicationDate: string;
      fields?: {
        thumbnail?: string;
        bodyText?: string;
      };
      sectionName: string;
    }>;
  };
}

export interface NYTApiResponse {
  status: string;
  response: {
    docs: Array<{
      _id: string;
      headline: {
        main: string;
      };
      abstract: string;
      web_url: string;
      pub_date: string;
      multimedia: Array<{
        url: string;
        type: string;
      }>;
      section_name: string;
      byline: {
        original: string;
      };
    }>;
  };
}
