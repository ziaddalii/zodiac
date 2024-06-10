// noinspection TypeScriptValidateTypes

"use client";

import { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import { usePopupState, bindHover, bindMenu } from "material-ui-popup-state/hooks";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


export default function PopoverButton({ trigger, children, super_category_name, center = false }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl ?? false);
    const styles = useMemo(
        () => ({
            justifyContent: { sm: center ? "center" : "start", xs: "center" },
            display: "absolute",
            zIndex: 100,
            overflow:"auto",
            textTransform: "capitalize",
            borderRadius: "0",
            fontWeight: "normal",
            color: open ? "white" : "black",
            textAlign: { sm: center ? "center" : "start", xs: "center" },
        }),
        [center, open]
    );

    const popupState = usePopupState({
        variant: "popover",
        popupId: "demoMenu",
    });
    return (
        <div className="w-full justify-self-center p-0 !relative overflow-auto">
            <Button
                component={"a"}
                {...bindHover(popupState)}
                href={`/${super_category_name.toLowerCase()}`}
                sx={styles}
                color={open ? "primary" : "secondary"}
                variant={open ? "contained" : "text"}
                id={`${super_category_name}-trigger`}
                aria-controls={open ? "menu-list" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                fullWidth
            >
                {trigger}
                <KeyboardArrowDownIcon/>
            </Button>

                <HoverMenu
                sx={{padding:"0!important", 
            "& .MuiList-padding":{
                padding:0,
            }}}
                    {...bindMenu(popupState)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                    {children}
                </HoverMenu>
        </div>
    );
}
