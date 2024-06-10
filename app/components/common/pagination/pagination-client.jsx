"use client";

import { Pagination, PaginationItem, Stack } from "@mui/material";

export default function PaginationBarClient({
  current_page,
  total_pages,
  set_page,
}) {
  return (
    <Stack spacing={2}>
      <Pagination
        sx={{ "&. MuiPagination-ul": { justifyContent: "center!important" } }}
        count={total_pages}
        shape="rounded"
        color="primary"
        renderItem={(item) => {
            return(
          <PaginationItem onClick={() => set_page(item.page)} {...item} />
        );}}
      />
    </Stack>
  );
}
