"use client";
import {Button, Typography, useTheme} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useEffect, useState} from "react";
import RemoveIcon from "@mui/icons-material/Remove";

export default function QuantityCounterButtons(
    {
        init = 1,
        maxQuantity = 1,
        onUpdate = () => {
        },
    }) {

    const theme = useTheme();

    const [isLoading, setIsLoading] = useState(false);
    const [current_quantity, set_current_quantity] = useState(init);

    useEffect(() => {
        update_quantity(current_quantity);
    }, [maxQuantity]);

    useEffect(() => {
        if (init === current_quantity) {
            return;
        }

        set_current_quantity(init);
    }, [init]);

    const update_quantity = async (new_value) => {
        setIsLoading(true);

        let new_quantity = new_value;

        if (new_value === 0) {
            new_quantity = 1;
        }

        if (new_value > maxQuantity) {
            new_quantity = maxQuantity;
        }

        if (new_quantity === current_quantity) {
            setIsLoading(false);
            return;
        }

        // RETURN NEW QUANTITY / IF ERROR USE CURRENT
        set_current_quantity(
            (await onUpdate(new_quantity)) ?? current_quantity,
        );

        setIsLoading(false);
    };

    return (
        <div className="grid grid-cols-3 w-24">
            <Button
                type="button"
                variant="outlined"
                className="aspect-square"
                color="accent"
                sx={{
                    minWidth: 0,
                    p: 0,
                    m: 0,
                    border: `1px solid ${theme.palette.secondary.main}`,
                    "&:hover": {
                        border: `1px solid ${theme.palette.primary.main}`,
                        transition: "150ms ease-in-out",
                    },
                }}
                disabled={current_quantity === maxQuantity || isLoading}
                onClick={() => update_quantity(current_quantity + 1)}
            >
                <AddIcon fontSize="small"/>
            </Button>{" "}
            <Typography
                sx={{
                    width: "32px",
                    height: "32px",
                    borderTop: `1px solid ${theme.palette.secondary.main}`,
                    borderBottom: `1px solid ${theme.palette.secondary.main}`,
                }}
                className="flex justify-center items-center aspect-square"
            >
                {current_quantity}
            </Typography>{" "}
            <Button
                type="button"
                className="aspect-square"
                variant="outlined"
                sx={{
                    minWidth: 0,
                    p: 0,
                    m: 0,
                    border: `1px solid ${theme.palette.secondary.main}`,
                    "&:hover": {
                        border: `1px solid ${theme.palette.primary.main}`,
                        transition: "150ms ease-in-out",
                    },
                }}
                color="accent"
                disabled={current_quantity === 1 || isLoading}
                onClick={() => update_quantity(current_quantity - 1)}>
                <RemoveIcon fontSize="small"/>
            </Button>
        </div>
    );
}
