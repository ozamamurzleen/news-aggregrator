'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserPreferences } from '@/types/user';
import { INITIAL_USER_PREFERENCES } from '@/lib/constants';

interface PreferencesContextType {
  preferences: UserPreferences;
  updateSources: (sources: string[]) => void;
  updateCategories: (categories: string[]) => void;
  updateAuthors: (authors: string[]) => void;
  resetPreferences: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(INITIAL_USER_PREFERENCES);
  useEffect(() => {
    const savedPreferences = localStorage.getItem('newsPreferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Failed to parse saved preferences:', error);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('newsPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const updateSources = (sources: string[]) => {
    setPreferences(prev => ({ ...prev, sources }));
  };

  const updateCategories = (categories: string[]) => {
    setPreferences(prev => ({ ...prev, categories }));
  };

  const updateAuthors = (authors: string[]) => {
    setPreferences(prev => ({ ...prev, authors }));
  };

  const resetPreferences = () => {
    setPreferences(INITIAL_USER_PREFERENCES);
  };

  return (
    <PreferencesContext.Provider value={{
      preferences,
      updateSources,
      updateCategories,
      updateAuthors,
      resetPreferences
    }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
