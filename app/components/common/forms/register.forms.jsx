"use client";
import {Button} from "@mui/material";
import {z} from "zod";
import {emailMsg, getError, hasError, minLengthMsg} from "@/components/validations/util";
import {useZod} from "/hooks/zod.hooks.js";
import {useState} from "react";
import {Controller} from "react-hook-form";
// import {post_contact_us} from "@/api/requests.api";
// import { scroll_to_top } from "@/components/common/buttons/floating-arrow.button";
import {useTranslation} from "react-i18next";
import BaseTextFieldInputs from "../inputs/base-text-field.inputs";
import {toggle_loading} from "../global-progress-bar.common";
import {notify} from "../global-snack-bar.common";
import {scroll_to_top} from "../../../../util/common";
import {post_register} from "../../../../api/requests/register.requests";
import InputImage from "../inputs/image.inputs";
import {zPhoto} from "@/components/validations/photo";
import {toLower} from "lodash-es";
import {useCartList} from "@/store/cart-list";

export const defaultRegisterValues = () => {
  return {
    photo: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  };
};
function build_form_data(validatedData, cart_list = []) {
  const form_data = new FormData();
  
  if (validatedData.photo) {
      form_data.append("photo", validatedData.photo);
  }
  
  form_data.append("first_name", validatedData.first_name);
  form_data.append("last_name", validatedData.last_name);
  form_data.append("email", toLower(validatedData.email));
  form_data.append("phone", validatedData.phone_number);
  form_data.append("password", validatedData.password);

  if (cart_list.length > 0) {
      cart_list.forEach((e, i) => {
          form_data.append(`cart[${i}][cartable_id]`, e.cartable_id);
          form_data.append(`cart[${i}][quantity]`, e.quantity);
      });
  }
  
  return form_data;
}

const RegisterForm = ({ locale }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const {list: cart_list} = useCartList();

  // Handling Form
  const { errors, onSubmit, control, getValues, setValue, watch, reset } =
    useZod(
      {
        photo: zPhoto(false, "fields.photo", t),

        first_name: z.string().min(3, minLengthMsg(3, "fields.first-name", t)),

        last_name: z.string().min(3, minLengthMsg(3, "fields.last-name", t)),

        email: z.string().email(emailMsg("fields.email", t)),

        phone_number: z
          .string()
          .min(11, minLengthMsg(11, "fields.phone", t))
          .regex(/^\d+$/),

        password: z.string().min(8, minLengthMsg(8, "fields.password", t)),
      },
      defaultRegisterValues(),
      async (validatedData) => {
        setIsLoading(true);

        await toggle_loading(true);
        scroll_to_top();

        const result = await post_register(build_form_data(validatedData, cart_list));

        if (typeof result === "string") {
          notify(true, result);
      } else {
          
          notify(false, t("messages.operation-completed"));
          
          reset();
          
          window.location.replace("/auth/login");
      }

        await toggle_loading(false);
        setIsLoading(false);
      }
    );

  const onImageSubmit = (file) => {
    control._formValues.photo = file;
  };

  return (
    <form className="space-y-2" onSubmit={onSubmit}>
      {/*InputImage*/}
      <Controller
        name="photo"
        control={control}
        render={() => (
          <InputImage
            t={t}
            id="register_image"
            init=""
            disabled={isLoading}
            hasError={hasError(errors, "photo")}
            error={getError(errors, "photo")}
            onImageSubmit={onImageSubmit}
          />
        )}
      />

      {/*First Name*/}
      <Controller
        name="first_name"
        control={control}
        render={({ field }) => (
          <BaseTextFieldInputs
            {...field}
            variant="filled"
            title={t("fields.first-name")}
            fullWidth
            id="first-name"
            type="text"
            label={t("fields.first-name")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.first-name"),
            })}
            error={hasError(errors, "first_name")}
            helpertext={getError(errors, "first_name")}
            disabled={isLoading}
          />
        )}
      />

      {/*Last Name*/}
      <Controller
        name="last_name"
        control={control}
        render={({ field }) => (
          <BaseTextFieldInputs
            {...field}
            variant="filled"
            title={t("fields.last-name")}
            fullWidth
            id="last-name"
            type="text"
            label={t("fields.last-name")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.last-name"),
            })}
            error={hasError(errors, "last_name")}
            helpertext={getError(errors, "last_name")}
            disabled={isLoading}
          />
        )}
      />

      {/*Email*/}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <BaseTextFieldInputs
            {...field}
            variant="filled"
            title={t("fields.e-mail")}
            fullWidth
            id="email"
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

      {/*Phone Number*/}
      <Controller
        name="phone_number"
        control={control}
        render={({ field }) => (
          <BaseTextFieldInputs
            {...field}
            variant="filled"
            fullWidth
            id="phone_number"
            type="text"
            label={t("fields.phone")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.phone-number"),
            })}
            error={hasError(errors, "phone_number")}
            helpertext={getError(errors, "phone_number")}
            disabled={isLoading}
          />
        )}
      />

      {/*Password*/}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <BaseTextFieldInputs
            {...field}
            variant="filled"
            fullWidth
            id="password"
            type="password"
            label={t("fields.password")}
            placeholder={t("placeholders.enter-#", {
              field: t("fields.password"),
            })}
            error={hasError(errors, "password")}
            helpertext={getError(errors, "password")}
            disabled={isLoading}
          />
        )}
      />

      <Button
        className="sm:w-auto w-full"
        disabled={isLoading}
        fullWidth
        type="submit"
        variant="contained"
        sx={{ color: "white" }}
      >
        {t("fields.submit")}
      </Button>
    </form>
  );
};

export default RegisterForm;
