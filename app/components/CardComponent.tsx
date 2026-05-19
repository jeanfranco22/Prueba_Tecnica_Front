import { CardProps } from "../types/CardTypes";

const CharacterCard = ({ name, status, gender, image }: CardProps) => {
  return (
    <article className="rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img src={image} alt={name} className="w-full h-56 object-cover" />

      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900">{name}</h2>

        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Status:</span> {status}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {gender}
          </p>
        </div>
      </div>
    </article>
  );
};

export default CharacterCard;
