"use client";

import {useSearchDrawer} from "@/store/search-drawer";
import {Button, Container, FormControl, InputBase, SwipeableDrawer} from "@mui/material";
import {useSearchParams} from "next/navigation";
import {useTranslation} from "react-i18next";
import PaginationBarClient from "../pagination/pagination-client";
import {format_page_num} from "../../../../util/common";
import {useRef, useState} from "react";
import SearchCard from "../cards/search.card";
import CloseIcon from "@mui/icons-material/Close";
import {post_search} from "../../../../api/requests/search.requests";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function SearchDrawer({ locale }) {
  const {
    open,
    set_open,
    set_list,
    list,
    set_current_page,
    current_page,
    last_page,
  } = useSearchDrawer();

  const searchParams = useSearchParams();

  const { t } = useTranslation(locale);
  const SearchRef = useRef(null);
  const [inputHelper, setInputHelper] = useState("");
  const formatted_page = format_page_num(searchParams.page);

  const sort_by = searchParams.sort === undefined ? "" : searchParams.sort;

  const handle_search = async (e) => {
    e.preventDefault();

    if (SearchRef === null || SearchRef.current.value.length < 1) {
      setInputHelper(t("validations.search-min"));
      return;
    }

    const body = {
      page: formatted_page,
      q: SearchRef.current.value,
    };

    setInputHelper("");

    const search_data = await post_search(body);

    if (search_data.data.length > 0) {
      set_current_page(search_data.current_page);
    }

    set_list(search_data.data);
  };

  return (
    <SwipeableDrawer
      sx={{
        ".MuiDrawer-paper": {
          height: "100%",
        },
      }}
      anchor={"bottom"}
      open={open}
      onClose={() => set_open(false)}
      onOpen={() => set_open(true)}
    >
      <div className="relative">
        <form onSubmit={handle_search} noValidate autoComplete="off">
          <FormControl sx={{ width: "100%" }}>
            <InputBase
              inputRef={SearchRef}
              className="border-t-1 border-t border-b border-b-1"
              sx={{
                width: "100",
                display: "flex",
                p: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
              placeholder={t("fields.search-for-products")}
              inputProps={{
                style: {
                  textAlign: "center",
                  fontSize: "36px",
                  color: "black",
                },
              }}
            />
          </FormControl>
        </form>
        <div>{inputHelper !== "" && <p className="text-xl text-center text-red-700">{inputHelper}</p>}</div>
        <Button
          className="!absolute end-4 top-4"
          sx={{ minWidth: 0, p: 0, marginTop: "0!important" }}
          onClick={() => set_open(false)}
        >
          <CloseIcon fontSize="large" />
        </Button>

        <Container
          className="space-y-8"
          component={"main"}
          maxWidth="xl"
          sx={{ padding: "2rem 0", minHeight: "65vh" }}
        >
          {list.length > 0 ? (
            <>
              {/* Products */}
              <section className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4 mb-8">
                {list.map((item) => (
                  <SearchCard
                    key={item.id}
                    item={item}
                    locale={locale}
                    egp={t("fields.egp")}
                  />
                ))}
              </section>
              {/* Pagination */}
              <PaginationBarClient
                set_page={set_current_page}
                current_page={current_page}
                last_page={last_page}
              />
            </>
          ) : (
            <article className="flex flex-col justify-center items-center">
              <h2 className="text-2xl">{t("messages.empty-products")}</h2>
              <ErrorOutlineIcon sx={{ height: "16rem", width: "16rem" }} />
            </article>
          )}
        </Container>
      </div>
    </SwipeableDrawer>
  );
}
