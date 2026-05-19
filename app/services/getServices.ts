const getCharacterService = async () => {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Error fetching characters");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getCharacterService;

export const getCharacterByIdService = async (id: string) => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

    if (!res.ok) {
      throw new Error("Error fetching character");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
