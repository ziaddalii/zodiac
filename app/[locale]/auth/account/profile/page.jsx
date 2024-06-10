import {Box, Button, Container} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonalInfoForm from "./../../../../components/common/forms/personal-info.forms";
import LogoutButton from "./../../../../components/common/buttons/logout.buttons";
import Link from "next/link";
import {get_profile} from "../../../../../api/requests/profile.requests";
import getTranslations from "@/i18n-next";
import {build_metadata} from "@/[locale]/layout";
import AddressesForm from "@/components/common/forms/addresses.forms";
import ChangePasswordForm from "@/components/common/forms/change-password.form";
import { get_locations } from "../../../../../api/requests/locations.requests";

export async function generateMetadata({params: {locale}}) {
    const {t} = await getTranslations(locale);

    return await build_metadata(locale, {
        title: t("placeholders.page-#", {title: t("navigation.profile")}),
    });
}

export default async function ProfilePage({params: {locale}}) {

    const {t} = await getTranslations(locale);

    const original_personal_info = await get_profile();

    const locations = await get_locations();

    return (
        <Box component="main">
            <Container maxWidth="md" component="section" className="space-y-8 py-8">

                <article className="flex justify-center gap-2 flex-wrap">
                    <Button
                        component={Link}
                        href="/auth/account/wishlist"
                        variant="contained"
                        className="flex gap-2 sm:w-auto w-full"
                    >
                        <FavoriteBorderIcon fontSize="small"/>
                        {t("navigation.wishlist")}
                    </Button>
                    <Button
                        component={Link}
                        href="/auth/account/orders"
                        variant="contained"
                        className="flex gap-2 sm:w-auto w-full"
                    >
                        <ShoppingCartCheckoutIcon fontSize="small"/>
                        {t("fields.orders")}
                    </Button>
                    <LogoutButton/>
                </article>

                <PersonalInfoForm
                    original_personal_info={original_personal_info}
                    locale={locale}
                />

                <AddressesForm
                    countries={locations.countries.map((country) => ({
                            id: country.id,
                            value: country.id,
                            name: country.names[locale],
                        }),
                    )}
                    provinces={locations.provinces.map((province) => ({
                            id: province.id,
                            value: province.id,
                            name: province.names[locale],
                            country: {
                                id: province.country.id,
                                value: province.country.id,
                                name: province.country.names[locale],
                            },
                        }),
                    )}
                    cities={locations.cities.map((city) => ({
                            id: city.id,
                            value: city.id,
                            name: city.names[locale],
                            country: {
                                id: city.country.id,
                                value: city.country.id,
                                name: city.country.names[locale],
                            },
                            province: {
                                id: city.province.id,
                                value: city.province.id,
                                name: city.province.names[locale],
                            },
                        }
                    ))}
                    original_address={original_personal_info.addresses}
                    locale={locale}
                />

                <ChangePasswordForm locale={locale}/>

            </Container>
        </Box>
    );
}
