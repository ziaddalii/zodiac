import {build_metadata} from "@/[locale]/layout";
import getTranslations from "@/i18n-next";
import {Container} from "@mui/material";
import {get_branches} from "../../../api/requests/branches.requests";
import PagesTitle from "@/components/common/headers/pages.titles";
import BranchCard from "@/components/common/cards/branch.card";
import ScrollHashIntoView from "@/components/common/other/scroll-hash-into-view";

export async function generateMetadata({params: {locale}}) {
    const {t} = await getTranslations(locale);

    const branches = await get_branches();
    const branches_names = branches.map((e) => e.name);

    return await build_metadata(locale, {
        title: t("placeholders.page-#", {title: t("navigation.branches")}),
        description: branches_names.join(" - "),
    });
}

export default async function BranchesPage({params: {locale}}) {
    const {t} = await getTranslations(locale);

    const branches = await get_branches();

    return (
        <Container maxWidth="xl">

            {/* Page Title */}
            <PagesTitle title={t("navigation.branches")}/>

            <ScrollHashIntoView base="branch-"/>

            {/* Content */}
            <div className="pb-8 !grid grid-cols-1 lg:grid-cols-2 gap-4">
                {branches.map((e) => (
                    <BranchCard
                        key={e.id}
                        locale={locale}
                        item={e}
                    />
                ))}
            </div>
        </Container>
    );
}
