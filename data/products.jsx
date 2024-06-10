import AccessoriesMain from "/public/hero-banner/accessories-1.jpg";
import AccessoriesSub from "/public/hero-banner/accessories-2.jpg";
import BlackGolfHat1 from "/public/products/accessories/black_golf_hat.jpg";
import BlackGolfHat2 from "/public/products/accessories/black_golf_hat_2.jpg";
export const women_products = [
  {
    id: 1,
    name: "",
    names: {
      en: "Golf Hat",
      ar: "قبعة جولف",
    },
    info_keys: [
      {
        key: {
          names: {
            en: "Erua",
            ar: "إيروا",
          },
        },
        values: {
          en: "Samulone",
          ar: "ساملوني",
        },
      },
      {
        key: {
          names: {
            en: "Britcia",
            ar: "بريتيشيا",
          },
        },
        values: {
          en: "Kanoro Sandy",
          ar: "كانورو ساندي",
        },
      },
      {
        key: {
          names: {
            en: "Colisim",
            ar: "كوليسيم",
          },
        },
        values: {
          en: "Rantu Follk",
          ar: "رانتو فولك",
        },
      },
      {
        key: {
          names: {
            en: "Stolism",
            ar: "ستوليزم",
          },
        },
        values: {
          en: "Kantra Sonitair",
          ar: "كانترا سونيتير",
        },
      },
    ],
    description: "",
    descriptions: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in",
      ar: "لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة المتمثلة في إدانة السرور ومدح الألم ، وسأقدم لك وصفًا كاملاً للنظام ، وأشرح التعاليم الفعلية للمستكشف العظيم للحقيقة ، الباني البارع.",
    },
    photos: {
      card: AccessoriesSub.src,
      alt: "Golf Hat - قبعة جولف",
      default: [],
      colors: [
        {
          photos: [AccessoriesMain.src, AccessoriesSub.src],
        },
      ],
    },
    tags: "",
    stats: {
      is_favorite: false,
      is_near_out_stock: true,
      stock: 0,
      favorites_count: 0,
      views_count: 0,
      is_new: false,
      rating_avg: 0,
      rating_count: 0,
    },
    prices: {
      normal: 1650,
      discount: 0,
      percent: 0,
    },
    super_category: {
      id: 0,
      name: "",
      names: {
        en: "Women",
        ar: "النساء",
      },
    },
    category: {
      id: 0,
      name: "Accessories - اكسسوارات",
      names: {
        en: "Accessories",
        ar: "اكسسوارات",
      },
    },
    sub_category: {
      id: 0,
      name: "",
      names: {
        en: "Hats",
        ar: "قبعات",
      },
    },
    brand: {
      id: 0,
      name: "",
      names: {
        en: "",
        ar: "",
      },
    },
    type: {
      id: 0,
      name: "",
      names: {
        en: "",
        ar: "",
      },
    },
    variants: [
      {
        id: 389,
        prices: {
          normal: 550,
          discount: 0,
          percent: 0,
        },
        size: {
          id: 1,
          name: "4 - 4",
          names: {
            en: "4",
            ar: "4",
          },
        },
        measurements: ["0", "0", "0", "0", "0", "0", "0", "0"],
        colors: [
          {
            id: 1001,
            color: {
              id: 1,
              name: "White - أبيض",
              names: {
                en: "White",
                ar: "أبيض",
              },
              hex: "#FFFFFF",
              count: {
                products: 16,
              },
            },
            stock: 12,
            photos: [AccessoriesMain.src, AccessoriesSub.src],
          },
          {
            id: 1001,
            color: {
              id: 1,
              name: "Navy - كحلي",
              names: {
                en: "Navy",
                ar: "كحلي",
              },
              hex: "#000800",
              count: {
                products: 16,
              },
            },
            stock: 12,
            photos: [BlackGolfHat1.src, BlackGolfHat2.src],
          },
        ],
      },
    ],
  },
];

export const products = [...women_products];
