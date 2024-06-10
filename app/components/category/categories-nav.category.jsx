"use client";
import { Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export default function CategoriesNav({ categories, locale }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <div>
    <div className="flex justify-center items-center">
    <Button
      onClick={() => setOpen(!open)}
      className="!text-white !mx-auto flex items-center justify-center gap-2 white"
    >
      <span>{t("fields.categories")}</span> <KeyboardArrowDownIcon />
    </Button>
    </div>
      <div
        className={`w-full basis-full space-y-2 bg-black transition-all ease-in-out duration-300 overflow-hidden ${open ? "py-8 max-h-[125rem]" : "py-0 max-h-[0rem]"}`}
      >
        {categories.map((category) => (
          <div key={category.id} className="flex gap-4">
            <Image
              width={40}
              height={40}
              className="object-contain"
              alt={category.names.en}
              src={category.photos.card}
            />
            <article>
              <h3 className="text-white">{category.names[locale]}</h3>
              <p className="text-SecondaryText">
                {category.count.products} {t("fields.products")}
              </p>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
