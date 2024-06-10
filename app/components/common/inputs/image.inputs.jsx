"use client";
import {Box, Button, Typography} from "@mui/material";
import {useState} from "react";
import ImageIcon from "@mui/icons-material/Image";
import DefaultUser from "/public/default-user.jpg";
import ImageCard from "./../cards/image.card";

export default function InputImage({ id, init, disabled, hasError, error, onImageSubmit, t }) {
    const [preview, setPreview] = useState(init ?? "");

    const onImageSelected = (e) => {
        const reader = new FileReader();

        if (!e.target.files || !e.target.files[0]) {
            return;
        }

        const imageFile = e.target.files[0];

        reader.readAsDataURL(imageFile);

        reader.onload = () => {
            if (reader.readyState !== 2) {
                return;
            }
            setPreview(reader.result);
            onImageSubmit(imageFile);
        };
    };

    return (
        <Box
            id={id}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
            }}
        >
            <ImageCard preview={preview} alt={id} base={DefaultUser.src} />

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <input
                    accept="image/*"
                    id="icon-button-photo"
                    onChange={onImageSelected}
                    type="file"
                    name="photo"
                    hidden
                />

                <label htmlFor="icon-button-photo">
                    <Button size="small" disabled={disabled} color="primary" component="div">
                        <ImageIcon width={14} height={14} />
                        <Typography variant="body1" sx={{ mx: "4px", fontSize:"14px" }}>
                            {t("fields.select-photo")}
                        </Typography>
                    </Button>
                </label>

            </Box>

            {hasError && (
                <Typography variant="caption" sx={{ color: "red" }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
}
