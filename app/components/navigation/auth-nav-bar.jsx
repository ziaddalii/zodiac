"use client";

import NavLinkButton from "@/components/common/buttons/nav-link.buttons";
import {is_authenticated} from "../../../api/cookies.api";
import {useTranslation} from "react-i18next";

export default function AuthNavBarButtons() {
    const {t} = useTranslation();

    return (
        <>
            {
                is_authenticated() ?
                    (
                        <NavLinkButton
                            name={t("fields.my-account")}
                            route={"/auth/account/profile"}
                        />
                    )
                    :
                    (
                        <NavLinkButton
                            name={t("fields.login-register")}
                            route={"/auth/login"}
                        />
                    )
            }
        </>
    );
}
