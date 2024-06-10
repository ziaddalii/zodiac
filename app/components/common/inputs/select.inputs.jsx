"use client";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import Link from "next/link";

export function FormSelect({
    id,
    value = "",
    onChange = null,
    required = false,
    fullWidth = false,
    variant = "filled",
    label,
    placeholder,
    size,
    items,
    field = null,
    error = false,
    disabled = false,
}) {
    const content_placeholder = (
        <MenuItem value={value} disabled>
            {placeholder}
        </MenuItem>
    );

    const content_list = items.map((e, i) =>
        e.link ? (
            <MenuItem key={i} value={e.value}>
                <Link href={e.link}>{e.name}</Link>
            </MenuItem>
        ) : (
            <MenuItem key={i} value={e.value}>
                {e.name}
            </MenuItem>
        )
    );

    return (
        <FormControl size={size} fullWidth={fullWidth}>
            <InputLabel id={`label_${id}`}>{label}</InputLabel>
            {field && (
                <Select
                    id={id}
                    labelId={`label_${id}`}
                    label={label}
                    {...field}
                    placeholder={placeholder}
                    required={required}
                    variant={variant}
                    disabled={disabled}
                    error={error}
                >
                    {content_placeholder}
                    {content_list}
                </Select>
            )}

            {onChange && (
                <Select
                    id={id}
                    labelId={`label_${id}`}
                    label={label}
                    placeholder={placeholder}
                    required={required}
                    variant={variant}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    error={error}
                >
                    {content_placeholder}
                    {content_list}
                </Select>
            )}
        </FormControl>
    );
}
