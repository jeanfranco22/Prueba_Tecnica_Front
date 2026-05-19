"use client";

import Link from "next/link";
import { useFavorites } from "../context/favoritesContext";
import CharacterCard from "../components/CardComponent";

const FavoritesPage = () => {
  const { favorites, moveFavoriteUp, moveFavoriteDown } = useFavorites();

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">Favorites</h1>

          <Link
            href="/"
            className="rounded-lg bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-700"
          >
            Back home
          </Link>
        </div>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">
            You don't have favorite characters yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((character) => (
              <div key={character.id}>
                <CharacterCard
                  id={character.id}
                  name={character.name}
                  status={character.status}
                  gender={character.gender}
                  image={character.image}
                />

                <div className="mt-3 flex justify-center gap-2">
                  <button
                    onClick={() => moveFavoriteUp(character.id)}
                    className="rounded-md bg-gray-900 px-3 py-1 text-white transition hover:bg-gray-700"
                  >
                    ↑
                  </button>

                  <button
                    onClick={() => moveFavoriteDown(character.id)}
                    className="rounded-md bg-gray-900 px-3 py-1 text-white transition hover:bg-gray-700"
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default FavoritesPage;
