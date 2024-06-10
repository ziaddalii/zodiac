"use client";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useTranslation} from "react-i18next";
import {useQuickViewDetails} from "@/store/quick-view-details";
import {Divider} from "@mui/material";
import {useMemo} from "react";
import DefaultImg from "/public/default.webp";

export default function QuickViewSelectSize({locale}) {
    const {t} = useTranslation();
    const {
        current_variant_index,
        variants,
        set_current_variant,
        colors,
        set_current_color,
    } = useQuickViewDetails();

    const on_change_size = (event) => {
        set_current_variant(event.target.value);
    };

    const on_change_color = (color_index) => {
        set_current_color(color_index);
    };

    const current_size = useMemo(() => current_variant_index === -1 ? "" : current_variant_index, [current_variant_index]);

    return (
        <section>
            <article className="flex gap-4 items-center">
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="sizes-select-input">{t("fields.sizes")}</InputLabel>
                    <Select
                        labelId="sizes-select"
                        id="sizes-select"
                        value={current_size}
                        label={t("fields.sizes")}
                        onChange={on_change_size}
                    >
                        {variants.map((variant, i) => {
                            return (
                                <MenuItem key={variant.id} value={i}>
                                    {variant.size.names[locale]}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </article>

            <Divider/>
            {/* COLORS */}
            <article className="flex flex-wrap gap-4 items-center py-4">
                {colors.map((color, color_index) => {
                    return (
                        <div
                            onClick={() => on_change_color(color_index)}
                            key={color.id}
                            className="relative cursor-pointer text-center"
                        >
                            <img
                                className="aspect-[2/3] w-20 h-30 object-cover"
                                src={color.photos[0] || DefaultImg.src}
                                alt={color.name}
                            />
                            <h2>{color.color.names[locale]}</h2>
                            <span
                                style={{backgroundColor: color.color.hex}}
                                className="absolute border rounded-full aspect-square top-2 size-4 start-2"
                            ></span>
                        </div>
                    );
                })}
            </article>
        </section>
    );
}
