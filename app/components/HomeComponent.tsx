"use client";

import { useEffect, useState } from "react";
import getCharacterService from "../services/getServices";
import CharacterCard from "./CardComponent";
import { CardProps } from "../types/CardTypes";
import InputComponent from "./InputComponent";

const HomeComponent = () => {
  const [characters, setCharacters] = useState<CardProps[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      const data = await getCharacterService();

      setCharacters(data.results);
    };

    fetchCharacters();
  }, []);

  const filterCharacters = characters.filter((character) => {
    return character.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <section className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">
          Rick and Morty
        </h1>

        <InputComponent
          type="text"
          placeholder="hola"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filterCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              status={character.status}
              gender={character.gender}
              image={character.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomeComponent;
