import getTranslations from "@/i18n-next";
import UnderlinedButton from "../buttons/underlined.button";
import {isEmpty} from "lodash-es";

export default async function PinnedCard({ item, locale }) {
  const {t} = await getTranslations(locale);
  return (
    <article className="relative bg-white">
    <div className="after:w-full after:absolute after:top-0 after:left-0 after:h-full after:bg-[#ffffff78]">
    <img className="w-[85%] object-contain ms-auto" src={item.photos.lg[locale]} alt={`${item.photos.alt} ${item.tags}`}/>
    </div>
      <div  className="absolute start-0 bottom-0 space-y-4 translate-y-[60%] max-w-[80%]">
        <hr className="w-8" />
        <h2 className="text-4xl font-thin capitalize">{item.titles[locale]}</h2>
        <p className="text-SecondaryText text-ellipsis line-clamp-4">
          {item.descriptions[locale]}
        </p>
          {!isEmpty(item.ref) && <UnderlinedButton link={item.ref}>{t("fields.view-more")}</UnderlinedButton>}
      </div>
    </article>
  );
}
