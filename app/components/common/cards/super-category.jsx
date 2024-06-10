import PagesTitle from "../headers/pages.titles";
import CategoryCardPage from "./category-page.card";

export default function SuperCategoryCard({ super_category, locale }) {
  return (
    <div className="space-y-12 divide-y-2">
      <PagesTitle title={super_category.names[locale]} />
      {
        super_category.categories.map((category) => {
            return(
                <CategoryCardPage key={category.id} category={category} locale={locale}/>
            );
        })
      }
    </div>
  );
}
