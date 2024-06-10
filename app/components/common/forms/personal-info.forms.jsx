"use client";
import {Box, Button, TextField} from "@mui/material";
import {z} from "zod";
import {useState} from "react";
import {Controller} from "react-hook-form";
import InputImage from "../inputs/image.inputs";
import {isString} from "lodash-es";
import {emailMsg, getError, hasError, minLengthMsg} from "./../../validations/util";
import {useTranslation} from "react-i18next";
import {toggle_loading} from "../global-progress-bar.common";
import {post_profile_edit} from "../../../../api/requests/profile.requests";
import {notify} from "../global-snack-bar.common";
import {useZod} from "../../../../hooks/zod.hooks";
import {zPhoto} from "./../../validations/photo";

function build_form_data(validated_data, original_personal_info) {
    const form_data = new FormData();

    if (validated_data.photo && validated_data.photo) {
        form_data.append("photo", validated_data.photo);
    }

    if (validated_data.first_name !== original_personal_info.name.first) {
        form_data.append("first_name", validated_data.first_name);
    }

    if (validated_data.last_name !== original_personal_info.name.last) {
        form_data.append("last_name", validated_data.last_name);
    }

    if (validated_data.email !== original_personal_info.email) {
        form_data.append("email", validated_data.email);
    }

    if (validated_data.phone1 !== original_personal_info.phones[0]) {
        form_data.append("phone1", validated_data.phone1);
    }

    if (validated_data.phone2 !== original_personal_info.phones[1]) {
        form_data.append("phone2", validated_data.phone2);
    }

    return form_data;
}

const PersonalInfoForm = ({original_personal_info, locale}) => {

    const {t} = useTranslation();

    const [isLoading, setIsLoading] = useState(false);

    const {watch, errors, onSubmit, control, getValues, reset} = useZod(
        {
            photo: zPhoto(false, "fields.photo", t),
            first_name: z.string().min(3, minLengthMsg(3, "fields.first-name", t)),
            last_name: z.string().min(3, minLengthMsg(3, "fields.last-name", t)),
            email: z.string().email(emailMsg("fields.email", t)),
            phone1: z
                .string()
                .min(11, minLengthMsg(11, "fields.phone", t))
                .regex(/^\d+$/),
            phone2: z.union([
                z.string().length(0),
                z
                    .string()
                    .min(11, minLengthMsg(11, "fields.phone", t))
                    .regex(/^\d+$/),
            ]),
        },
        {
            photo: "",
            first_name: original_personal_info.name.first,
            last_name: original_personal_info.name.last,
            email: original_personal_info.email ?? "",
            phone1: original_personal_info.phones[0] ?? "",
            phone2: original_personal_info.phones[1] ?? "",
        },
        async (validatedData) => {
            setIsLoading(true);

            await toggle_loading(true);

            // scroll_to_top();
            const result = await post_profile_edit(
                build_form_data(validatedData, original_personal_info),
                locale
            );

            if (isString(result)) {
                notify(true, result);
                await toggle_loading(false);
                setIsLoading(false);
                return;
            }

            notify(false, t("messages.operation-completed"));
            setTimeout(() => {
                window.location.replace("/auth/account/profile");
            }, 1000);
        }
    );

    const onImageSubmit = (file) => {
        control._formValues.photo = file;
    };

    return (
        <Box
            className="space-y-8 p-4 border border-1 rounded-lg"
            onSubmit={onSubmit}
            component="form"
        >
            <h2 className="font-bold">{t("fields.personal-info")}</h2>

            {/* Photo */}
            <Controller
                name="photo"
                control={control}
                render={() => (
                    <InputImage
                        t={t}
                        id="personal_info_image"
                        init={original_personal_info.photoUrl}
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
                render={({field}) => (
                    <TextField
                        {...field}
                        variant="filled"
                        fullWidth
                        id="first_name"
                        type="text"
                        label={t("fields.first-name")}
                        title={t("fields.first-name")}
                        placeholder={t("placeholders.enter-#", {
                            field: t("fields.first-name"),
                        })}
                        error={hasError(errors, "first_name")}
                        helperText={getError(errors, "first_name")}
                        disabled={isLoading}
                    />
                )}
            />

            {/*Last Name*/}
            <Controller
                name="last_name"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        variant="filled"
                        fullWidth
                        id="last_name"
                        type="text"
                        label={t("fields.last-name")}
                        placeholder={t("placeholders.enter-#", {
                            field: t("fields.last-name"),
                        })}
                        error={hasError(errors, "last_name")}
                        helperText={getError(errors, "last_name")}
                        disabled={isLoading}
                    />
                )}
            />

            {/*E-mail*/}
            <Controller
                name="email"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        variant="filled"
                        fullWidth
                        id="email"
                        type="text"
                        label={t("fields.e-mail")}
                        placeholder={t("placeholders.enter-#", {
                            field: t("fields.e-mail"),
                        })}
                        error={hasError(errors, "email")}
                        helperText={getError(errors, "email")}
                        disabled={isLoading}
                    />
                )}
            />
            {/* Phone Number */}
            <Controller
                name="phone1"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        variant="filled"
                        fullWidth
                        id="phone1"
                        type="text"
                        label={t("fields.phone")}
                        placeholder={t("placeholders.enter-#", {
                            field: t("fields.phone"),
                        })}
                        error={hasError(errors, "phone1")}
                        helperText={getError(errors, "phone1")}
                        disabled={isLoading}
                    />
                )}
            />

            <Controller
                name="phone2"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        variant="filled"
                        fullWidth
                        id="phone2"
                        type="text"
                        label={t("fields.phone")}
                        placeholder={t("placeholders.enter-#", {
                            field: t("fields.phone"),
                        })}
                        error={hasError(errors, "phone2")}
                        helperText={getError(errors, "phone2")}
                        disabled={isLoading}
                    />
                )}
            />

            <Button
                disabled={isLoading}
                type="submit"
                onSubmit={onSubmit}
                variant="contained"
                sx={{color: "white", marginInline: "auto", display: "block"}}
            >
                {t("fields.save")}
            </Button>
        </Box>
    );
};

export default PersonalInfoForm;
