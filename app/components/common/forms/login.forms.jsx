"use client";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import {z} from "zod";
import {getError, hasError, minLengthMsg} from "@/components/validations/util";
import {useZod} from "/hooks/zod.hooks.js";
import {useState} from "react";
import {Controller} from "react-hook-form";
import {useTranslation} from "react-i18next";
import BaseTextFieldInputs from "../inputs/base-text-field.inputs";
import {toggle_loading} from "../global-progress-bar.common";
import {notify} from "../global-snack-bar.common";
import {scroll_to_top} from "../../../../util/common";
import Link from "next/link";
import {post_login} from "../../../../api/requests/login.requests";
import {set_cookies_after_login} from "../../../../api/cookies.api";
import {useCartList} from "@/store/cart-list";
import {useFavoritesList} from "@/store/favorites-list";

export const defaultLoginValues = () => {
    return {
        phone: "",
        password: "",
    };
};

const LoginForm = ({locale}) => {
    const {t} = useTranslation();

    const {set_favorites_list} = useFavoritesList();
    const {set_cart_list, list} = useCartList();

    const [isLoading, setIsLoading] = useState(false);

    // Handling Form
    const {errors, onSubmit, control, reset} = useZod(
        {

            phone: z
                .string()
                .min(11, minLengthMsg(11, "fields.phone", t))
                .regex(/^\d+$/),

            password: z.string().min(8, minLengthMsg(8, "fields.password", t)),

        },
        defaultLoginValues(),
        async (validated_data) => {

            setIsLoading(true);

            await toggle_loading(true);
            scroll_to_top();

            const body = {
                phone: validated_data.phone,
                password: validated_data.password,
            };

            if (list.length > 0) {
                body.cart = list;
            }

            const result = await post_login(body, locale);

            if (typeof result === "string") {
                notify(true, result);
            } else {

                notify(false, t("messages.operation-completed"));

                reset();

                set_cookies_after_login(result.data.token, result.data.expiration, result.data.id);

                set_favorites_list(result.data.favorites);

                set_cart_list(result.data.cart);

                window.location.replace("/");
            }

            await toggle_loading(false);

            setIsLoading(false);
        },
    );

    return (
        <form className="space-y-2" onSubmit={onSubmit}>
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

            {/*Password*/}
            <Controller
                name="password"
                control={control}
                render={({field}) => (
                    <BaseTextFieldInputs
                        {...field}
                        variant="outlined"
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

            <div className="flex justify-between items-center">
                <FormControlLabel
                    sx={{
                        fontSize: "14px",
                    }}
                    control={<Checkbox defaultChecked/>}
                    label={t("fields.remember-me")}
                />
                <Link className="font-bold hover:underline text-sm" href="#">
                    {t("fields.forgot-password")}
                </Link>
            </div>

            <Button
                className="sm:w-auto w-full"
                disabled={isLoading}
                fullWidth
                type="submit"
                variant="contained"
                sx={{color: "white"}}
            >
                {t("fields.submit")}
            </Button>
        </form>
    );
};

export default LoginForm;
