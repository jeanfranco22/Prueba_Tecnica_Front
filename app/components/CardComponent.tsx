import Link from "next/link";
import { CardProps } from "../types/CardTypes";
import FavoriteComponent from "./FavoriteComponent";

const CharacterCard = ({ name, status, gender, image, id }: CardProps) => {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <Link href={`/character/${id}`}>
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-56 w-full cursor-pointer object-cover"
          />
        </Link>

        <div className="absolute top-3 right-3">
          <FavoriteComponent
            id={id}
            name={name}
            status={status}
            gender={gender}
            image={image}
          />
        </div>
      </div>

      <div className="p-4">
        <Link href={`/character/${id}`}>
          <h2 className="cursor-pointer text-lg font-bold text-gray-900 transition hover:text-blue-500">
            {name}
          </h2>
        </Link>

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
