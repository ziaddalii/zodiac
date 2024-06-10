"use client";
import {Button} from "@mui/material";
import {z} from "zod";
import {emailMsg, getError, hasError, minLengthMsg} from "@/components/validations/util";
import {useZod} from "/hooks/zod.hooks.js";
import {useRef, useState} from "react";
import {Controller} from "react-hook-form";
import {useTranslation} from "react-i18next";
import BaseTextFieldInputs from "../inputs/base-text-field.inputs";
import {toggle_loading} from "../global-progress-bar.common";
import {scroll_to_top} from "../../../../util/common";
import {notify} from "@/components/common/global-snack-bar.common";
import {post_contact_us} from "../../../../api/requests/contact.requests";

export const defaultContactUsValues = () => {
    return {
        email: "",
        name: "",
        phone: "",
        message: "",
    };
};

const ContactUsForm = ({locale}) => {
    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [validated_data, set_validated_data] = useState(defaultContactUsValues());

    const recaptcha_ref = useRef(null);

    // Handling Form
    const {errors, onSubmit, control, reset} = useZod(
        {
            email: z.string().email(emailMsg("fields.email", t)),

            name: z.string().min(3, minLengthMsg(3, "fields.name", t)),

            phone: z
                .string()
                .min(11, minLengthMsg(11, "fields.phone", t))
                .regex(/^\d+$/),

            message: z.string().min(3, minLengthMsg(3, "fields.enquiry", t)),
        },
        defaultContactUsValues(),
        async (validatedData) => {

            setIsLoading(true);
            set_validated_data(validatedData);


            await toggle_loading(true);
            scroll_to_top();

            //TODO
            // recaptcha_ref.current.execute();
            // await on_recaptcha_change(1);

            const result = await post_contact_us(validated_data);

            if (result) {
                notify(true, result);
            } else {
                notify(false, t("messages.operation-completed"));
                reset();
            }

            await toggle_loading(false);
            setIsLoading(false);
        }
    );

    const on_recaptcha_change = async (captcha_code) => {

        if (!captcha_code) {
            setIsLoading(false);
            await toggle_loading(false);
            notify(true, t("messages.unexpected-error"));
            return;
        }


        const result = await post_contact_us(validated_data);

        if (result) {
            notify(true, result);
        } else {
            notify(false, t("messages.operation-completed"));
            reset();
        }

        await toggle_loading(false);
        setIsLoading(false);

        recaptcha_ref.current.reset();
    };

    return (
        <form className="space-y-4" onSubmit={onSubmit}>
            {/*Email*/}
            <Controller
                name="email"
                control={control}
                render={({field}) => (
                    <BaseTextFieldInputs
                        {...field}
                        variant="outlined"
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

            {/*Name*/}
            <Controller
                name="name"
                control={control}
                render={({field}) => (
                    <BaseTextFieldInputs
                        {...field}
                        variant="outlined"
                        fullWidth
                        id="name"
                        type="text"
                        label={t("fields.name")}
                        placeholder={t("placeholders.enter-#", {field: t("fields.name")})}
                        error={hasError(errors, "name")}
                        helpertext={getError(errors, "name")}
                        disabled={isLoading}
                    />
                )}
            />

            {/*Phone Number*/}
            <Controller
                name="phone"
                control={control}
                render={({field}) => (
                    <BaseTextFieldInputs
                        {...field}
                        variant="outlined"
                        fullWidth
                        id="phone"
                        type="text"
                        label={t("fields.phone-number")}
                        placeholder={t("placeholders.enter-#", {
                            field: t("fields.phone-number"),
                        })}
                        error={hasError(errors, "phone")}
                        helpertext={getError(errors, "phone")}
                        disabled={isLoading}
                    />
                )}
            />

            {/*Message*/}
            <Controller
                name="message"
                control={control}
                render={({field}) => (
                    <BaseTextFieldInputs
                        sx={{marginBottom: ".5rem"}}
                        {...field}
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={4}
                        maxRows={8}
                        id="outlined-multiline-flexible"
                        type="text"
                        label={t("fields.enquiry")}
                        placeholder={t("placeholders.enter-#", {
                            field: t("fields.enquiry"),
                        })}
                        error={hasError(errors, "message")}
                        helpertext={getError(errors, "message")}
                        disabled={isLoading}
                    />
                )}
            />

            {/*Recaptcha*/}
            {/*<ReCAPTCHA*/}
            {/*    ref={recaptcha_ref}*/}
            {/*    size="invisible"*/}
            {/*    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}*/}
            {/*    onChange={on_recaptcha_change}*/}
            {/*/>*/}

            <Button
                className="sm:w-auto w-full"
                disabled={isLoading}
                type="submit"
                variant="contained"
                sx={{color: "white"}}
            >
                {t("fields.submit")}
            </Button>
        </form>
    );
};

export default ContactUsForm;
