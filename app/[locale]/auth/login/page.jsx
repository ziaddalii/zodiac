import {Breadcrumbs, Button, Container} from "@mui/material";
import Link from "next/link";
import getTranslations from "@/i18n-next";
import LoginForm from "@/components/common/forms/login.forms";
import {build_metadata} from "@/[locale]/layout";

export async function generateMetadata({params: {locale}}) {
  const {t} = await getTranslations(locale);

  return (await build_metadata(locale, {
    title: t("placeholders.page-#", {title: t("navigation.login")}),
  }));
}

export default async function LoginPage({ params: { locale } }) {

  const { t } = await getTranslations(locale);

  return (
    <div>

      <article className="bg-black py-8 text-center space-y-4">

        <h2 className="text-white text-5xl">{t("fields.my-account")}</h2>

        <Breadcrumbs
          className="mx-auto"
          sx={{
            "& .MuiBreadcrumbs-ol": {
              justifyContent: "center",
            },
          }}
          aria-label="breadcrumb"
        >
          <Link
            className="hover:opacity-75 transition-all uppercase text-sm"
            href="/"
          >
            {t("navigation.home")}
          </Link>
          <h3 className="text-white uppercase text-sm">
            {t("fields.my-account")}
          </h3>
        </Breadcrumbs>
      </article>

      <Container maxWidth="xl">

        <section className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-y-0 divide-y my-8">

          {/* Login */}
          <article className="col-span-1 space-y-4 py-16 px-12">
            <h2 className="text-xl uppercase">{t("fields.login")}</h2>
            <LoginForm/>
          </article>

          {/* Register */}
          <article className="col-span-1 py-16 px-12 text-center space-y-8">
            <h2 className="text-xl uppercase">{t("fields.register")}</h2>
            <p className="text-SecondaryText">{t("fields.registering-for-this-site")}</p>
            <Button className="mx-auto block" variant="contained" color="secondary" component={Link} href="/auth/register">{t("fields.register")}</Button>
          </article>

        </section>
      </Container>
    </div>
  );
}
