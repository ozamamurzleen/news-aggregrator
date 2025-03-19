 export const NEWS_CATEGORIES = [
    { id: 'politics', name: 'Politics' },
    { id: 'general', name: 'General' },
    { id: ['world', 'world news'], name: 'World' },
    { id: 'arts', name: 'Arts' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' },
  ];

export const INITIAL_USER_PREFERENCES: UserPreferences = {
    sources: ['newsapi', 'guardian', 'nyt'],
    categories: ['general', 'technology', 'business', 'politics', 'world', 'health', 'sports', 'science'],
    authors: [],
  };

export const API_KEYS = {
    NEWSAPI: process.env.NEXT_PUBLIC_NEWSAPI_KEY || 'your-newsapi-key',
    GUARDIAN: process.env.NEXT_PUBLIC_GUARDIAN_KEY || 'your-guardian-key',
    NYT: process.env.NEXT_PUBLIC_NYT_KEY || 'your-nyt-key',
  };

import { UserPreferences } from '@/types/user';
