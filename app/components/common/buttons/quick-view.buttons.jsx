"use client";
import {Button, Tooltip} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useQuickViewDetails} from "@/store/quick-view-details";
import {useTranslation} from "react-i18next";

export default function QuickViewButton({product}) {
    const {t} = useTranslation();

    const {on_toggle} = useQuickViewDetails();

    return (
        <Tooltip title={t("fields.quick-view")} placement="left-start">
            <Button onClick={() => on_toggle(true, product)} sx={{px: 0, minWidth: 0}}>
                <SearchIcon/>
            </Button>
        </Tooltip>
    );
}