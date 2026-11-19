import type { DemoData } from "@/types/site";

export const demoSeed: DemoData = {
  product: {
    name: "NEW CETRiS",
    arabicName: "نيو سيتريس",
    description: {
      ar: "منظف متعدد الاستخدامات في عبوة بخاخ عملية سعة لتر واحد. استخدمه وفقًا للتعليمات المدونة على العبوة.",
      en: "A multi-purpose cleaner in a convenient 1-liter trigger spray bottle. Use according to the bottle instructions.",
    },
    capacity: "1 liter",
    packageType: { ar: "عبوة بخاخ بمسدس رش", en: "Trigger spray bottle" },
    uses: [
      "المطبخ|Kitchen",
      "الحمام|Bathroom",
      "السيراميك|Ceramic",
      "السيارات|Cars",
      "السجاد|Carpets",
      "المفروشات|Upholstery",
    ].map((value) => {
      const [ar, en] = value.split("|");
      return { ar: ar ?? "", en: en ?? "" };
    }),
  },
  variants: [
    {
      id: "variant-01",
      name: "Variant 01",
      color: "#f8fafc",
      colorLabel: { ar: "أبيض — لون مبدئي", en: "White — provisional" },
      imagePath: "",
      altText: { ar: "", en: "" },
      visible: true,
      order: 1,
    },
    {
      id: "variant-02",
      name: "Variant 02",
      color: "#f2c94c",
      colorLabel: { ar: "أصفر — لون مبدئي", en: "Yellow — provisional" },
      imagePath: "",
      altText: { ar: "", en: "" },
      visible: true,
      order: 2,
    },
    {
      id: "variant-03",
      name: "Variant 03",
      color: "#9b7bd4",
      colorLabel: { ar: "بنفسجي — لون مبدئي", en: "Purple — provisional" },
      imagePath: "",
      altText: { ar: "", en: "" },
      visible: true,
      order: 3,
    },
    {
      id: "variant-04",
      name: "Variant 04",
      color: "#6caa79",
      colorLabel: { ar: "أخضر — لون مبدئي", en: "Green — provisional" },
      imagePath: "",
      altText: { ar: "", en: "" },
      visible: true,
      order: 4,
    },
  ],
  offer: { quantity: 2, price: 100, currency: "EGP", active: true, startDate: "", endDate: "" },
  content: {
    heroTitle: { ar: "نظافة يومية بخطوة بسيطة", en: "A simple step for everyday cleaning" },
    heroSubtitle: {
      ar: "تعرّف على NEW CETRiS، منظف متعدد الاستخدامات من الجيوشي للمنظفات الصناعية.",
      en: "Meet NEW CETRiS, a multi-purpose cleaner by El-Gioushy Industrial Detergents.",
    },
    benefits: [
      { ar: "عبوة بخاخ عملية", en: "Convenient trigger spray" },
      { ar: "سعة 1 لتر", en: "1-liter capacity" },
      { ar: "تعليمات استخدام واضحة", en: "Clear usage instructions" },
    ],
    howTo: [
      {
        ar: "رش المنتج على السطح حسب تعليمات العبوة.",
        en: "Spray onto the surface as directed on the bottle.",
      },
      { ar: "اتركه لمدة 30 ثانية.", en: "Wait for 30 seconds." },
      { ar: "امسح بقطعة قماش جافة.", en: "Wipe with a dry cloth." },
    ],
    cta: { ar: "اسأل عن NEW CETRiS", en: "Ask about NEW CETRiS" },
  },
  faqs: [
    {
      question: { ar: "ما سعة العبوة؟", en: "What is the bottle capacity?" },
      answer: {
        ar: "سعة العبوة لتر واحد، وهي مزودة بمسدس رش.",
        en: "The bottle holds one liter and has a trigger spray top.",
      },
    },
    {
      question: { ar: "كيف أستخدم المنتج؟", en: "How should I use it?" },
      answer: {
        ar: "اتبع تعليمات العبوة: رش، انتظر 30 ثانية، ثم امسح بقطعة قماش جافة. اختبر سطحًا صغيرًا مخفيًا أولًا عند الحاجة.",
        en: "Follow the bottle instructions: spray, wait 30 seconds, then wipe with a dry cloth. Test a small hidden area first where appropriate.",
      },
    },
    {
      question: {
        ar: "هل تختلف الألوان في التركيبة؟",
        en: "Do the colors indicate different formulas?",
      },
      answer: {
        ar: "الألوان المعروضة مبدئية فقط، ولا تمثل اختلافًا مؤكدًا في التركيبة أو الرائحة.",
        en: "The displayed colors are provisional and do not indicate confirmed formula or fragrance differences.",
      },
    },
    {
      question: { ar: "ما العرض الحالي؟", en: "What is the current offer?" },
      answer: {
        ar: "يمكنك الاطلاع على العرض الحالي في صفحة العروض والتواصل معنا للاستفسار.",
        en: "See the current offer on the Offers page and contact us with questions.",
      },
    },
  ],
  settings: {
    whatsappNumber: "+0201016264326",
    whatsappNumberNeedsVerification: true,
    facebook: "https://www.facebook.com/CETRiS1.ElGioushy/",
    tiktok: "https://www.tiktok.com/@ahmedelgioushy6",
    pinterest: "https://www.pinterest.com/ahmedsoliman861996/",
    x: "https://x.com/AhmedSolimdg",
    instagram: "",
    website: "https://el-geoushy-cleaning.vercel.app/",
    googleMapsListingUrl:
      "https://www.google.com/maps/search/?api=1&query=%D8%A7%D9%84%D8%AC%D9%8A%D9%88%D8%B4%D9%8A+%D9%84%D9%84%D9%85%D9%86%D8%B8%D9%81%D8%A7%D8%AA+%D8%A7%D9%84%D8%B5%D9%86%D8%A7%D8%B9%D9%8A%D8%A9+%D8%B2%D9%81%D8%AA%D9%89+%D8%A7%D9%84%D8%BA%D8%B1%D8%A8%D9%8A%D8%A9",
    googleReviewUrl:
      "https://www.google.com/maps/search/?api=1&query=%D8%A7%D9%84%D8%AC%D9%8A%D9%88%D8%B4%D9%8A+%D9%84%D9%84%D9%85%D9%86%D8%B8%D9%81%D8%A7%D8%AA+%D8%A7%D9%84%D8%B5%D9%86%D8%A7%D8%B9%D9%8A%D8%A9+%D8%B2%D9%81%D8%AA%D9%89+%D8%A7%D9%84%D8%BA%D8%B1%D8%A8%D9%8A%D8%A9",
    googleMapsEmbedUrl: "https://www.google.com/maps?q=30.6227343,31.2289189&z=14&output=embed",
    address: { ar: "زفتى، محافظة الغربية، مصر", en: "Zefta, Gharbia, Egypt" },
    latitude: "30.6227343",
    longitude: "31.2289189",
    pageTitle: {
      ar: "NEW CETRiS | منظف متعدد الاستخدامات",
      en: "NEW CETRiS | Multi-purpose cleaner",
    },
    pageDescription: {
      ar: "تعرّف على NEW CETRiS من الجيوشي للمنظفات الصناعية.",
      en: "Discover NEW CETRiS by El-Gioushy Industrial Detergents.",
    },
    socialImagePath: "",
  },
};
