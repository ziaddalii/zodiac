"use client";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useEffect, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {useProductDetails} from "@/store/product-details";
import {Divider} from "@mui/material";

export default function ProductSelectSize({ product_variants, locale }) {
  const { t } = useTranslation();
  const {
    variants,
    set_variants,
    set_current_variant,
    current_variant_index,
    colors,
    product,
    set_current_color,
    default_photos,
  } = useProductDetails();

  useEffect(() => {
    set_variants(product_variants);
    set_current_variant(0);
  }, []);

  const handleChange = (event) => {
    set_current_variant(event.target.value);
  };

  const handleChangeColor = (color_index) => {
    set_current_color(color_index);
  };

  const current_size = useMemo(
      () => current_variant_index === -1 || variants.length === 0?
          "" : current_variant_index,
      [current_variant_index, variants],
  );

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
            onChange={handleChange}
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

        {/*<div>
          {" "}
          <Button variant="outlined" onClick={handleClickOpen}>
            {t("fields.sizes-guide")}
          </Button>
          <Dialog
            className="rounded-none"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleClose}>Agree</Button>
            </DialogActions>
          </Dialog>
        </div>*/}

      </article>

      <Divider />

      {/* COLORS */}
      <article className="flex flex-wrap gap-4 items-center py-4">
        {colors.map((color, color_index) => {
          return (
            <div
              onClick={() => handleChangeColor(color_index)}
              key={color.id}
              className="relative cursor-pointer text-center"
            >
              <img
                className="aspect-[2/3] w-20 h-30 object-cover"
                src={color.photos[0] ?? default_photos[0]}
                alt={color.color.names[locale]}
              />
              <h2>{color.color.names[locale]}</h2>
              <span
                style={{ backgroundColor: color.color.hex }}
                className="absolute border rounded-full aspect-square top-2 size-4 start-2"
              ></span>
            </div>
          );
        })}
      </article>
    </section>
  );
}
