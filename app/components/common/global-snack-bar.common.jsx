"use client";

import {Alert, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";

export function notify(error, message) {
    window.dispatchEvent(
        new CustomEvent(
            "notify",
            {
                detail: {error, message},
            },
        ),
    );
}

export function GlobalSnackbarNotification({locale}) {
    
    const [show, set_show] = useState(false);
    const [message, set_message] = useState("");
    const [is_error, set_is_error] = useState(false);
    
    const on_notify = ({detail: {error, message}}) => {
        set_is_error(error);
        set_message(message);
        set_show(true);
    };
    
    useEffect(() => {
        
        window.addEventListener("notify", on_notify);
        
        return () => {
            window.removeEventListener("notify", on_notify);
        };
    }, []);
    
    return (
        <Snackbar
            id="global-snackbar-notification"
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            autoHideDuration={5000}
            onClose={() => (set_show(false))}
            open={show}
        >
            <Alert severity={is_error ? "error" : "success"}
                   sx={{
                       width: "100%",
                   }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
