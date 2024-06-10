import MenMain from "/public/hero-banner/men-1.webp";
import MenSub from "/public/hero-banner/men-2.jpg";
import WomenMain from "/public/hero-banner/women-1.jpg";
import WomenSub from "/public/hero-banner/women-2.jpg";
import AccessoriesMain from "/public/hero-banner/accessories-1.jpg";
import AccessoriesSub from "/public/hero-banner/accessories-2.jpg";
export const slides = [
    {
      main: {
        id: 7,
        photos: {
          lg: {
            en: MenMain.src,
            ar: MenMain.src,
          },
          alt: "Regular Fit Oxford shirt - قميص أكسفورد ذو مقاس عادي",
        },
        titles: {
          en: "Regular Fit Oxford shirt",
          ar:"قميص أكسفورد ذو مقاس عادي",
        },
        ref: "/products/1",
      },
      sub: {
        id: 8,
        photos: {
          lg: {
            en: MenSub.src,
            ar: MenSub.src,
          },
          alt: "Regular Fit Oxford shirt - قميص أكسفورد ذو مقاس عادي",
        },
        ref: "/products/1",
      },
    },
    {
      main: {
        id: 6,
        photos: {
          lg: {
            en: WomenMain.src,
            ar: WomenMain.src,
          },
          alt: "Knitted sweater - سترة محبوكة",
        },
        titles: {
          en: "Knitted sweater",
          ar:"سترة محبوكة",
        },
        ref: "/products/2",
      },
      sub: {
        id: 5,
        photos: {
          lg: {
            en: WomenSub.src,
            ar: WomenSub.src,
          },
          alt: "Knitted sweater - سترة محبوكة",
        },
        ref: "/products/2",
      },
    },
    {
      main: {
        id: 3,
        photos: {
          lg: {
            en: AccessoriesMain.src,
            ar: AccessoriesMain.src,
          },
          alt: "Golf White Hat - قبعة جولف بيضاء",
        },
        titles: {
          en: "Golf White Hat",
          ar: "قبعة جولف بيضاء",
        },
        ref: "/products/3",
      },
      sub: {
        id: 4,
        photos: {
          lg: {
            en: AccessoriesSub.src,
            ar: AccessoriesSub.src,
          },
          alt: "Golf White Hat - قبعة جولف بيضاء",
        },
        ref: "/products/3",
      },
    },
  ];