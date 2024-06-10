"use client";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useState} from "react";
import Link from "next/link";
import {useTranslation} from "react-i18next";
import {usePathname, useSearchParams} from "next/navigation";

export default function SortSelect() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const [sort, setSort] = useState(searchParams.get("sort") ?? "");

  const page = searchParams.get("page");

  const pathname = usePathname();

  const handle_query = (query, value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(query, value);

    window.location.replace(`${pathname}?${newParams.toString()}`);
  };
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const items = [
    <MenuItem
      key={1}
      value={"price-low"}
      onClick={() => {
        handle_query("sort", "price-low");
      }}
    >
      {t("fields.price-low-to-high")}
    </MenuItem>,
    <MenuItem
      key={2}
      value={"price-high"}
      onClick={() => {
        handle_query("sort", "price-high");
      }}
    >
      {t("fields.price-high-to-low")}
    </MenuItem>,
    <MenuItem
      key={3}
      value={"latest"}
      onClick={() => {
        handle_query("sort", "latest");
      }}
    >
      {t("fields.latest")}
    </MenuItem>,
    <MenuItem
      key={4}
      value={"popular"}
      onClick={() => {
        handle_query("sort", "popular");
      }}
    >
      {t("fields.popular")}
    </MenuItem>,
    <MenuItem
      key={5}
      value={"reviews"}
      onClick={() => {
        handle_query("sort", "reviews");
      }}
    >
      {t("fields.reviews")}
    </MenuItem>,
  ];

  return (
    <FormControl variant="standard" sx={{minWidth: 250}}>
      <InputLabel id="sort-select-input">{t("fields.sort-by")}</InputLabel>
      <Select
        labelId="sort-select"
        id="sort-select"
        value={sort}
        label="Sort"
        onChange={handleChange}
      >
        <MenuItem value="">
          <Link href={`?page=${page}`}>{t("fields.default")}</Link>
        </MenuItem>
        {items.map((item) => item)}
      </Select>
    </FormControl>
  );
}
