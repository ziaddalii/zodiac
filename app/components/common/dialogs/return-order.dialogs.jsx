"use client";
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SlideUpTransition } from "@/components/common/transitions/slide.transitions";
import { post_return_order } from "../../../../api/requests/orders.requests";
import { z } from "zod";
import {
  getError,
  hasError,
  minLengthMsg,
} from "@/components/validations/util";
import { useZod } from "/hooks/zod.hooks.js";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import BaseTextFieldInputs from "../inputs/base-text-field.inputs";
import { toggle_loading } from "../global-progress-bar.common";
import { notify } from "@/components/common/global-snack-bar.common";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {useTheme} from "@mui/material";

export const defaultValues = () => {
  return {
    reason: "",
  };
};
export default function ReturnOrderDialog({
  locale,
  open,
  setOpen,
  product,
  order,
}) {
  const { t } = useTranslation();

  // const handle_return_product = () => {
  //   const payload = {
  //     order_product: product.id,
  //     type: type,
  //     quantity:quantity,
  //   };
  //   if(type === "2"){
  //     payload.reason = reasonRef.current.value;
  //   }
  //   return(
  //     post_return_order(payload, order.id)
  //   );
  // };
  const [disabled, setDisabled] = useState();
  const [selectedValue, setSelectedValue] = useState(0);

  useEffect(() => {
    // Check if the "other address" option is selected and set disabled accordingly
    if (selectedValue === "2") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedValue]);

  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { errors, onSubmit, control, reset } = useZod(
    {
      reason: selectedValue === "2" ? z.string().min(3, minLengthMsg(3, "fields.reason", t)) : z.string(),
    },
    defaultValues(),
    async (validatedData) => {
      setIsLoading(true);

      const payload = {
          order_product: product.id,
          type: selectedValue,
          quantity: quantity,
        };
        if (selectedValue === "2") {
            payload.reason = validatedData.reason;
        }
        const result = await post_return_order(payload, locale);
        
        await toggle_loading(true);
      if (result) {
        notify(true, result);
      } else {
        notify(false, t("messages.operation-completed"));
        reset();
      }

      await toggle_loading(false);
      setIsLoading(false);
      setOpen(false);
      window.location.reload();
    }
  );
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      TransitionComponent={SlideUpTransition}
      keepMounted
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "920px",
          minWidth: "320px",
          width: "100%",
          borderRadius: "0",
        },
      }}
      aria-describedby="quick-view-dialog"
    >
      <DialogContent className="relative">
      <p>{t("fields.reason")}</p>
        <form className="space-y-4" onSubmit={onSubmit}>
          <FormControl>
            <RadioGroup
              onChange={(_, value) => {
                setSelectedValue(value);
                if (value === 2) {
                  return;
                }
              }}
              className="space-y-2"
              aria-labelledby="address group"
              name="address group"
            >
              <div>
                <FormControlLabel
                  value={"0"}
                  control={<Radio />}
                  label={t("fields.size")}
                />
              </div>
              <div>
                <FormControlLabel
                  value={"1"}
                  control={<Radio />}
                  label={t("fields.defects")}
                />
              </div>
              <div>
                <FormControlLabel
                  value={"2"}
                  control={<Radio />}
                  label={t("fields.other")}
                />
              </div>
            </RadioGroup>
          </FormControl>

          {/* Quantity */}
          <p>{t("fields.quantity")}</p>
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
              disabled={quantity === product.quantity || isLoading}
              onClick={() => setQuantity(quantity + 1)}
            >
              <AddIcon fontSize="small" />
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
              {quantity}
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
              disabled={quantity === 1 || isLoading}
              onClick={() => setQuantity(quantity - 1)}
            >
              <RemoveIcon fontSize="small" />
            </Button>
          </div>

          {/*Reason*/}
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <BaseTextFieldInputs
                {...field}
                variant="outlined"
                fullWidth
                id="reason"
                type="text"
                label={t("fields.reason")}
                placeholder={t("placeholders.enter-#", {
                  field: t("fields.reason"),
                })}
                error={hasError(errors, "reason")}
                helpertext={getError(errors, "reason")}
                disabled={disabled || isLoading}
              />
            )}
          />

          <Button
            className="sm:w-auto w-full"
            disabled={isLoading}
            type="submit"
            variant="contained"
            sx={{ color: "white" }}
          >
            {t("fields.submit")}
          </Button>
        </form>

        {/* Close Dialog Button */}
        <Button
          onClick={() => setOpen(false)}
          sx={{ minWidth: "0", padding: "0" }}
          variant="text"
          className="!absolute top-4 end-4"
        >
          <CloseIcon />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
