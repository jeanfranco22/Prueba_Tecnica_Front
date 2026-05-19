"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import getCharacterService from "../services/getServices";
import CharacterCard from "./CardComponent";
import { CardProps } from "../types/CardTypes";
import InputComponent from "./InputComponent";
import SpeciesChart from "./SpeciesCharts";

const HomeComponent = () => {
  const [characters, setCharacters] = useState<CardProps[]>([]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacterService();

        if (data?.results) {
          setCharacters(data.results);
        }
      } catch (error) {
        setError("Error loading characters");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">{error}</p>;
  }

  const filterCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl font-bold text-gray-900">Rick and Morty</h1>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-lg px-4 py-2 transition ${
                viewMode === "grid"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              Grid
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`rounded-lg px-4 py-2 transition ${
                viewMode === "list"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              Lista
            </button>

            <Link
              href="/favorites"
              className="rounded-lg bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-700"
            >
              Favoritos
            </Link>
          </div>
        </div>

        <InputComponent
          type="text"
          placeholder="Buscar personaje"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <SpeciesChart characters={filterCharacters} />

        {filterCharacters.length === 0 ? (
          <p className="text-center text-gray-500">
            No se encontraron personajes.
          </p>
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filterCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                status={character.status}
                gender={character.gender}
                image={character.image}
                species={character.species}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filterCharacters.map((character) => (
              <article
                key={character.id}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md"
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="h-24 w-24 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <Link href={`/character/${character.id}`}>
                    <h2 className="text-lg font-bold text-gray-900 hover:text-blue-500">
                      {character.name}
                    </h2>
                  </Link>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Status:</span>{" "}
                    {character.status}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Gender:</span>{" "}
                    {character.gender}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Species:</span>{" "}
                    {character.species}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default HomeComponent;
