export default function PagesTitle({ title }) {
  return (
    <article className="my-8">
      <div className="h-[1px] lg:w-40 w-20 bg-[black] lg:mb-8 mb-4"></div>
      <p className="lg:text-8xl md:text-7xl text-3xl text-primary font-bold">
        {title}
      </p>
    </article>
  );
}
