"use client";
// import {Badge, Button} from "@mui/material";
import {Button, CardActionArea} from "@mui/material";
import Link from "next/link";
// import ForumIcon from "@mui/icons-material/Forum";
import {useTranslation} from "react-i18next";
import {format_date_day_and_month} from "../../../../util/common";

export default function ArticleCard({ article, locale }) {
  const {t} = useTranslation();
  return (
    <CardActionArea component="article" className="group">
      <Link href={`/articles/${article.id}`}>
        <div className="relative">

          <div className="aspect-[6/4] w-full overflow-hidden">
            <img
              className="group-hover:scale-110 h-full group-hover:brightness-50 w-full overflow-hidden transition-all duration-500 object-cover object-top"
              src={article.cover_url}
              alt={article.title}
            />
          </div>

          {/* Created At */}
          <div className="w-12 bg-white absolute top-4 left-4 p-2 text-2xl text-center">
            {format_date_day_and_month(article.created_at)}
          </div>

          {/* Categories */}
          <div className="bg-primary capitalize w-max text-sm text-white px-2 py-1 absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2">
            {article.categories}
          </div>

        </div>

        <div className="p-4 mt-4 text-center space-y-2">

          <h2 className="text-2xl text-center capitalize">{article.titles[locale]}</h2>

          <div className="flex gap-4 justify-center items-center">

            <div className="flex gap-1 items-center justify-start">
              <p className="text-sm text-SecondaryText capitalize">{article.author}</p>
            </div>

            {/*<ShareIcon />*/}
          </div>

          <p className="text-SecondaryText text-ellipsis line-clamp-3 text-center">
            {article.descriptions[locale]}
          </p>

          <Button variant="text">{t("fields.continue-reading")}</Button>

        </div>
      </Link>
    </CardActionArea>
  );
}
