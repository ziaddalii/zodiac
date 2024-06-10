"use client";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";

export function ConfirmationDialog({ t, show, onConfirm, onClose }) {
    const [is_disabled, set_is_disabled] = useState(false);

    const wrap_disabled = async (callback) => {
        set_is_disabled(true);
        await callback();
        set_is_disabled(false);
    };

    const on_confirm = async () => {
        await wrap_disabled(onConfirm);
        onClose();
    };

    return (
        <Dialog open={show} onClose={onClose}>
            <DialogTitle> {t("fields.confirmation")}</DialogTitle>

            <DialogContent sx={{ width: "100%" }} className="w-full max-w-xl min-w-[320px]">{t("fields.are-you-sure")}</DialogContent>

            <DialogActions>
                <Button
                    disabled={is_disabled}
                    variant="outlined"
                    
                    onClick={onClose}
                >
                    {t("fields.cancel")}
                </Button>
                <Button variant="contained" disabled={is_disabled} onClick={on_confirm}>
                    {t("fields.confirm")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
