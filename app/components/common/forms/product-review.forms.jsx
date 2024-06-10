"use client";

import {Button, Rating, Typography} from "@mui/material";
import {z} from "zod";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import BaseTextFieldInputs from "../inputs/base-text-field.inputs";
import {Controller} from "react-hook-form";
import {emailMsg, getError, hasError, minLengthMsg} from "@/components/validations/util";
import {useZod} from "/hooks/zod.hooks.js";

export default function ProductReviewForm() {
  const [ratingValue, setRatingValue] = useState(0);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const { errors, onSubmit, control, reset, setValue } =
    useZod(
      {
        review_rate: z.number().min(1),
        email: z.string().email(emailMsg("fields.email", t)),

        name: z.string().min(3, minLengthMsg(3, "fields.name", t)),

        review: z.string().min(3, minLengthMsg(3, "fields.your-review", t)),
      },
      { review_rate: 0, email: "", name: "", review: "" },
      async (validatedData) => {
        setIsLoading(true);

        //   await toggle_loading(true);
        scroll_to_top();

        // const result = await post_contact_us(validatedData, locale!);
        if (result) {
          // notify(true, result);
        } else {
          // notify(false, t("fields.operation_completed"));
          reset();
        }

        //   await toggle_loading(false);
        setIsLoading(false);
      }
    );

  return (
    <section className="space-y-4 py-4">
      <form className="space-y-2" onSubmit={onSubmit}>
        <div className="flex gap-4">
          <Typography component="legend" className="text-SecondaryText">
            {t("fields.your-rating")}:
          </Typography>

          <Rating
            name="review_rate"
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
              setValue("review_rate", newValue);
            }}
          />
        </div>
        {
          <p
            className={`text-red-600 text-sm ${getError(errors, "review_rate") ? "opacity-100" : "opacity-0"}`}
          >
            {getError(errors, "review_rate") ? t("validations.rating") : " ."}
          </p>
        }
        <Controller
          name="review"
          control={control}
          render={({ field }) => (
            <BaseTextFieldInputs
              sx={{ marginBottom: ".5rem" }}
              {...field}
              variant="outlined"
              fullWidth
              multiline
              minRows={4}
              maxRows={8}
              type="text"
              label={t("fields.your-review")}
              placeholder={t("placeholders.enter-#", {
                field: t("fields.your-review"),
              })}
              error={hasError(errors, "review")}
              helpertext={getError(errors, "review")}
              disabled={isLoading}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <BaseTextFieldInputs
              sx={{ marginBottom: ".5rem" }}
              {...field}
              variant="outlined"
              fullWidth
              type="text"
              label={t("fields.name")}
              placeholder={t("placeholders.enter-#", {
                field: t("fields.name"),
              })}
              error={hasError(errors, "name")}
              helpertext={getError(errors, "name")}
              disabled={isLoading}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <BaseTextFieldInputs
              sx={{ marginBottom: ".5rem" }}
              {...field}
              variant="outlined"
              fullWidth
              type="text"
              label={t("fields.e-mail")}
              placeholder={t("placeholders.enter-#", {
                field: t("fields.e-mail"),
              })}
              error={hasError(errors, "email")}
              helpertext={getError(errors, "email")}
              disabled={isLoading}
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
    </section>
  );
}
