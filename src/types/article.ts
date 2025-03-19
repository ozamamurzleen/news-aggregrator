export interface Article {
    id: string;
    title: string;
    description: string;
    content?: string;
    url: string;
    image?: string;
    source: {
      id: string;
      name: string;
    };
    urlToImage?: string;
    author?: string;
    category?: string;
    publishedAt: string;
  }