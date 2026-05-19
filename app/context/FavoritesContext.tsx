"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CardProps } from "../types/CardTypes";

interface FavoritesContextType {
  favorites: CardProps[];
  addFavorite: (character: CardProps) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  moveFavoriteUp: (id: number) => void;
  moveFavoriteDown: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<CardProps[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const addFavorite = (character: CardProps) => {
    setFavorites((prevFavorites) => {
      const alreadyExists = prevFavorites.some(
        (fav) => fav.id === character.id,
      );

      if (alreadyExists) {
        return prevFavorites;
      }

      const updatedFavorites = [character, ...prevFavorites];

      return updatedFavorites.slice(0, 5);
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== id),
    );
  };

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  const moveFavoriteUp = (id: number) => {
    setFavorites((prevFavorites) => {
      const index = prevFavorites.findIndex((fav) => fav.id === id);

      if (index <= 0) {
        return prevFavorites;
      }

      const updatedFavorites = [...prevFavorites];

      [updatedFavorites[index - 1], updatedFavorites[index]] = [
        updatedFavorites[index],
        updatedFavorites[index - 1],
      ];

      return updatedFavorites;
    });
  };

  const moveFavoriteDown = (id: number) => {
    setFavorites((prevFavorites) => {
      const index = prevFavorites.findIndex((fav) => fav.id === id);

      if (index === -1 || index === prevFavorites.length - 1) {
        return prevFavorites;
      }

      const updatedFavorites = [...prevFavorites];

      [updatedFavorites[index], updatedFavorites[index + 1]] = [
        updatedFavorites[index + 1],
        updatedFavorites[index],
      ];

      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        moveFavoriteUp,
        moveFavoriteDown,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
};
