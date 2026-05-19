import { getCharacterByIdService } from "@/app/services/getServices";
import FavoriteComponent from "@/app/components/FavoriteComponent";

interface CharacterDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CharacterDetailPage = async ({ params }: CharacterDetailPageProps) => {
  const { id } = await params;

  const character = await getCharacterByIdService(id);

  if (!character) {
    return <p>El personaje no pudo encontrarse</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-md">
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src={character.image}
            alt={character.name}
            className="w-full rounded-xl object-cover"
          />

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                {character.name}
              </h1>

              <FavoriteComponent
                id={character.id}
                name={character.name}
                status={character.status}
                gender={character.gender}
                image={character.image}
              />
            </div>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {character.status}
              </p>
              <p>
                <span className="font-semibold">Gender:</span>{" "}
                {character.gender}
              </p>
              <p>
                <span className="font-semibold">Species:</span>{" "}
                {character.species}
              </p>
              <p>
                <span className="font-semibold">Origin:</span>{" "}
                {character.origin.name}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {character.location.name}
              </p>
              <p>
                <span className="font-semibold">Episodes:</span>{" "}
                {character.episode.length}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CharacterDetailPage;
