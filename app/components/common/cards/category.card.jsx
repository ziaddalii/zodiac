import Link from "next/link";
export default function CategoryCard({ item, locale }) {
  return (
    <Link
      href={`categories/${item.id}`}
      className="w-full h-full overflow-hidden block relative"
    >
      <img
        className="object-cover object-top h-full w-full group-hover:scale-110 transition-all duration-500 ease-in-out"
        src={item.photos.lg}
        alt={item.name}
      />
      <div className="absolute -bottom-5 start-4 group-hover:bottom-4 transition-all duration-500">
        <h2 className="mb-5 text-3xl">{item.names[locale]}</h2>
        <p className="text-SecondaryText">{item.subtitles[locale]}</p>
      </div>
    </Link>
  );
}
