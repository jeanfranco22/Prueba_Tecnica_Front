"use client";

import { useFavorites } from "../context/favoritesContext";
import { MdOutlineFavorite } from "react-icons/md";
import { CardProps } from "../types/CardTypes";

const FavoriteComponent = ({ id, name, status, gender, image }: CardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(id);
  return (
    <button
      onClick={() =>
        favorite
          ? removeFavorite(id)
          : addFavorite({ id, name, status, gender, image })
      }
    >
      {favorite ? (
        <MdOutlineFavorite className="text-red-500" />
      ) : (
        <MdOutlineFavorite />
      )}
    </button>
  );
};

export default FavoriteComponent;
