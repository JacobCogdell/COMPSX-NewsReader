import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const [savedArticles, setSavedArticles] = useState({});

  const { user } = useAuth();

  const getUserSavedArticles = () => {
    if (!user) return [];
    return savedArticles[user.username] || [];
  };

  const getAllUserArticles = () => {
    return savedArticles;
  };

  const saveArticle = (article) => {
    if (!user) return;

    setSavedArticles((prev) => {
      const userArticles = prev[user.username] || [];

      if (userArticles.find((a) => a.url === article.url)) {
        return prev;
      }

      return {
        ...prev,
        [user.username]: [...userArticles, article],
      };
    });
  };

  const removeArticle = (url) => {
    if (!user) return;

    setSavedArticles((prev) => ({
      ...prev,
      [user.username]: (prev[user.username] || []).filter(
        (article) => article.url !== url
      ),
    }));
  };

  const isArticleSaved = (url) => {
    if (!user) return false;

    return (savedArticles[user.username] || []).some(
      (article) => article.url === url
    );
  };

  return (
    <ArticlesContext.Provider
      value={{
        saveArticle,
        removeArticle,
        isArticleSaved,
        getUserSavedArticles,
        getAllUserArticles,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export const useArticles = () => {
  const context = useContext(ArticlesContext);

  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }

  return context;
};