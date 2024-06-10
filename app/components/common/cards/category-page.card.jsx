import getTranslations from "@/i18n-next";
import Link from "next/link";
import {CardActionArea} from "@mui/material";

export default async function CategoryCardPage({category, locale}) {
    const {t} = await getTranslations(locale);
    return (
        <article className="grid gap-4 md:grid-cols-3 grid-cols-1">
            {/* Category */}
            <div className="col-span-1">
                <CardActionArea component={Link} href={`categories/${category.id}?page=1`}>

                    <img
                        className="w-full object-cover"
                        src={category.photos.lg}
                        alt={category.photos.alt}
                    />
                    <div className="space-y-2 mt-2">
                        <h2
                              className="capitalize text-4xl">{category.names[locale]}</h2>
                        <p className="text-SecondaryText">
                            {category.sub_categories.length} {t("fields.products")}
                        </p>
                    </div>

                </CardActionArea>
            </div>
            <div className="md:col-span-2 col-span-1">
                <div className="flex flex-wrap w-full">
                    {
                        category.sub_categories.map((sub_category) => {
                            return (
                                <Link
                                    key={sub_category.id}
                                    href={`/categories/${category.id}/${sub_category.id}?page=1`}
                                    className="sm:w-1/3 w-full h-fit my-4  hover:underline transition-all text-SecondaryText capitalize hover:text-black text-2xl">
                                    <CardActionArea sx={{padding:"16px"}}>

                                        <div
                                            className="flex gap-2 items-center">
                                        <img className="size-20 object-cover rounded-[100%]" src={sub_category.photos.lg}
                                             alt={sub_category.photos.alt}/>

                                        <span>
                                            {sub_category.names[locale]}
                                        </span>
                                        </div>
                                    </CardActionArea>
                                </Link>
                            );
                        })
                    }
                </div>

            </div>

        </article>
    );
}
