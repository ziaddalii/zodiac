// noinspection TypeScriptValidateTypes

"use client";
import { Box, Button, TextField } from "@mui/material";
import { z } from "zod";
import { getError, hasError, minLengthMsg, passwordConfirmMsg } from "../../validations/util";
import { useState } from "react";
import { Controller } from "react-hook-form";
// import { scroll_to_top } from "@/components/common/buttons/floating-arrow.button";
import { isString } from "lodash-es";
import { useZod } from "../../../../hooks/zod.hooks";
import { useTranslation } from "react-i18next";
import { toggle_loading } from "../global-progress-bar.common";
import { notify } from "../global-snack-bar.common";
import { post_profile_edit } from "../../../../api/requests/profile.requests";

function build_form_data(validatedData) {
  const form_data = new FormData();
  form_data.append("old_password", validatedData.old_password);
  form_data.append("password", validatedData.password);

  return form_data;
}

const ChangePasswordForm = ({ locale }) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const { errors, onSubmit, control, getValues, reset } = useZod(
    {
      old_password: z
        .string()
        .min(8, minLengthMsg(8, "fields.old-password", t)),
      password: z.string().min(8, minLengthMsg(8, "fields.new-password", t)),
      confirm_password: z
        .string()
        .min(6, minLengthMsg(8, "fields.confirm-password", t))
        .refine(
          (arg) => {
            const password = getValues("password");
            return arg === password;
          },
          passwordConfirmMsg("fields.confirm-password", t)
        ),
    },
    {
      old_password: "",
      password: "",
      confirm_password: "",
    },
    async (validatedData) => {
      setIsLoading(true);

      await toggle_loading(true);

      // scroll_to_top();

      const result = await post_profile_edit(
        build_form_data(validatedData),
        locale
      );

      if (isString(result)) {
        notify(true, result);
      } else {
        notify(false, t("messages.operation-completed"));
        setTimeout(() => {
          // navigate.replace("/auth/account");
          // reset();
          window.location.replace("/auth/account/profile");
        }, 1000);
      }

      await toggle_loading(false);
      setIsLoading(false);
    }
  );

  return (
    <Box
      className="space-y-8 p-8 border border-1 rounded-lg"
      onSubmit={onSubmit}
      component="form"
    >
      {/*Old Password*/}
      <h2 className="font-bold">{t("fields.password")}</h2>

      <Controller
        name="old_password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            fullWidth
            autoComplete="off"
            id="current-password"
            type="password"
            label={t("fields.old-password")}
            title={t("fields.old-password")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.password")})}
            error={hasError(errors, "old_password")}
            helperText={getError(errors, "old_password")}
            disabled={isLoading}
          />
        )}
      />

      {/*New Password*/}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            fullWidth
            autoComplete="on"
            id="new-password"
            type="password"
            label={t("fields.new-password")}
            title={t("fields.new-password")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.password")})}
            error={hasError(errors, "password")}
            helperText={getError(errors, "password")}
            disabled={isLoading}
          />
        )}
      />

      {/*Confirm Password*/}
      <Controller
        name="confirm_password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="filled"
            fullWidth
            autoComplete="off"
            id="confirm_password"
            type="password"
            label={t("fields.confirm-password")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.confirm-password")})}
            error={hasError(errors, "confirm_password")}
            helperText={getError(errors, "confirm_password")}
            disabled={isLoading}
          />
        )}
      />

      <Button
        disabled={isLoading}
        onSubmit={onSubmit}
        type="submit"
        variant="contained"
        sx={{ color: "white", marginInline: "auto", display: "block" }}
      >
        {t("fields.save")}
      </Button>
    </Box>
  );
};

export default ChangePasswordForm;
