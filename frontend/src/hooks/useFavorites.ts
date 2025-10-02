import { useState } from "react";

export function useFavorites(initialFavorites: string[] = ["dashboard", "schedule"]) {
  const [favorites, setFavorites] = useState<string[]>(initialFavorites);

  const toggleFavorite = (menuKey: string) => {
    setFavorites(prev => {
      if (prev.includes(menuKey)) {
        return prev.filter(key => key !== menuKey);
      } else if (prev.length < 5) {
        return [...prev, menuKey];
      }
      return prev;
    });
  };

  const removeFavorite = (menuKey: string) => {
    setFavorites(prev => prev.filter(key => key !== menuKey));
  };

  return {
    favorites,
    toggleFavorite,
    removeFavorite,
  };
}