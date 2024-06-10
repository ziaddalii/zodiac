"use client";
import {Button, Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ChecklistIcon from "@mui/icons-material/Checklist";
import {useCompareList} from "@/store/compare-list";
import {useRouter} from "next/navigation";

export default function CompareButton({product_id}) {
    const {t} = useTranslation();
    const router = useRouter();

    const {update_compare_list, in_compare_list} = useCompareList();

    const [is_compared, set_is_compared] = useState(in_compare_list(product_id));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        set_is_compared(in_compare_list(product_id));
    }, []);

    const on_toggle = async () => {
        if (is_compared) {
            router.push("/compare");
            return;
        }

        setIsLoading(true);
        set_is_compared(
            update_compare_list(product_id),
        );
        setIsLoading(false);
    };

    return (
        <Tooltip title={t(is_compared ? "fields.view-in-compare" : "fields.compare")} placement="left-start">
            <Button
                type="button"
                disabled={isLoading}
                onClick={on_toggle}
                sx={{px: 0, minWidth: 0}}>
                {is_compared ? <ChecklistIcon color="accent"/> : <CompareArrowsIcon/>}
            </Button>
        </Tooltip>
    );
}
