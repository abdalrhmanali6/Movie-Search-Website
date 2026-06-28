import { Link } from "react-router-dom";

type CardProps = {
  image: string;
  title: string;
  id: number;
  mediaType: "movie" | "tv";
};

const Card = ({ image, title, id, mediaType }: CardProps) => {
  return (
    <Link to={`/${mediaType}/${title}/${id}`}>
      <figure className="group relative w-36 cursor-pointer shrink-0 select-none">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={`https://image.tmdb.org/t/p/w342${image}`}
            alt={title}
            className="w-36 h-52 object-cover rounded-xl transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-50"
            loading="lazy"
          />

        <div className="absolute inset-y-0 left-0 w-1 bg-primary-container rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </figure>
    </Link>
  );
};

export default Card;