/* eslint-disable react/jsx-key */
import {Button, Stack, Typography} from "@mui/material";
import Link from "next/link";

export default function PaginationBar(
    {
        show = true,
        base_url,
        first_page,
        current_page,
        total_pages,
        per_page,
        total_count,
        t,
        query_builder = null,
        query = null,
    }) {

    const showing = 1 + (current_page - 1) * per_page;
    const of = total_count;
    let to = total_count > 10 * per_page ? current_page * per_page : of;

    const build_final_query = (page) => {
        if (query) {
            return `${base_url}?${query}&page=${page}`;
        }

        if (query_builder) {
            return `${base_url}?${query_builder(page)}`;
        }

        return `${base_url}?page=${page}`;
    };

    const links = [];
    for (let i = 1; i <= total_pages; i++) {

        if (current_page === i) {
            links.push(
                <Button
                    key={i}
                    variant="contained"
                    sx={{color: "white", minWidth: "0.1rem"}}>
                    {i}
                </Button>,
            );
        } else {
            links.push(
                <Button
                    key={i}
                    component={Link}
                    href={build_final_query(i)}
                    variant="outlined"
                    sx={{minWidth: "0"}}>
                    {i}
                </Button>,
            );
        }
    }

    return show ? (
        <div className="!flex justify-between items-center">

            <Stack spacing={2} direction="row" className="flex flex-wrap flex-justify-start items-center">
            {
                // Check if there are less than 4 links, return all links
                links.length < 4 ? 
                links : 
                // If current page is the first page
                (current_page === 1 ? 
                // Display links 1, 2, 3, ellipsis, and the last link
                [links[0], links[1], links[2], <div> . . .</div>, links[links.length - 1]] :
                // If current page is the last page
                (current_page === links.length ?
                // Display first page, ellipsis, and the last three links
                [links[0], <div> . . .</div>, links[current_page - 2], links[current_page - 1], links[current_page]] :
                // If current page is the second last page
                (current_page === links.length - 1 ?
                // Display first page, ellipsis, the second last link, and the last two links
                [links[0], <div> . . .</div>, links[current_page - 2], links[current_page - 1], links[current_page]] :
                // If current page is greater than 2
                (current_page > 2 ?
                // Display first page, ellipsis, the previous two links, current page, ellipsis, and the last link
                [links[0], <div> . . .</div>, links[current_page - 2], links[current_page - 1], links[current_page], <div> . . .</div>, links[links.length - 1]] :
                // If current page is less than or equal to 2
                [links[current_page - 2], links[current_page - 1], links[current_page], <div> . . .</div>, links[links.length - 1]]))))
            }
            </Stack>

            <Typography>
                {t("fields.showing")} {showing} {t("fields.to")} {to}{" "}
                {t("fields.of")} {of} ({total_pages} {t("fields.pages")})
            </Typography>

        </div>
    ) : (<></>);
}
