"use client";
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useCompareList} from "@/store/compare-list";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function ProductCompareButton({product_id}) {
    const {t} = useTranslation();

    const router = useRouter();

    const {update_compare_list, in_compare_list} = useCompareList();

    const [is_compared, set_is_compared] = useState(in_compare_list(product_id));
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        set_is_compared(in_compare_list(product_id));
    }, []);

    return (
        <Button
            type="button"
            disabled={isLoading}
            onClick={on_toggle}
            sx={{display: "flex", gap: "4px", alignItems: "center"}}
        >
            {is_compared ? <ChecklistIcon className="shadow-xl" color="accent"/> : <CompareArrowsIcon/>}{" "}
            <span>{t(is_compared ? "fields.view-in-compare" : "fields.compare")}</span>
        </Button>
    );
}
