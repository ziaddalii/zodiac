"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Grid5 from "/public/icons/grid-5.png";
import Grid4 from "/public/icons/grid-4.png";
import Grid3 from "/public/icons/grid-3.png";
import Lines from "/public/icons/lines.png";
export default function ShowType() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handle_query = (query, value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(query, value);
    router.push(`${pathname}?${newParams.toString()}`);
  };
  return (
    <>
      <div className="flex items-center gap-2 ms-auto">
        <h3 className="font-bold">{t("fields.show")}:</h3>
        <span
          className="cursor-pointer"
          onClick={() => handle_query("show", "50")}
        >
          50
        </span>
        /
        <span
          className="cursor-pointer"
          onClick={() => handle_query("show", "75")}
        >
          75
        </span>
        /
        <span
          className="cursor-pointer"
          onClick={() => handle_query("show", "100")}
        >
          100
        </span>
      </div>
      <span
        className="cursor-pointer"
        onClick={() => handle_query("view", "list")}
      >
        <Image width={24} height={24} src={Lines} alt="lines" />
      </span>
      <span
        className="cursor-pointer"
        onClick={() => handle_query("view", "grid-3")}
      >
        <Image width={24} height={24} src={Grid3} alt="grid-3" />
      </span>
      <span
        className="cursor-pointer"
        onClick={() => handle_query("view", "grid-4")}
      >
        <Image width={24} height={24} src={Grid4} alt="grid-4" />
      </span>
      <span
        className="cursor-pointer"
        onClick={() => handle_query("view", "grid-5")}
      >
        <Image width={24} height={24} src={Grid5} alt="grid-5" />
      </span>
    </>
  );
}
