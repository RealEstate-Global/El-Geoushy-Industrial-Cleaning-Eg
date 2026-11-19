export type Locale = "ar" | "en";
export type Localized = { ar: string; en: string };

export type Variant = {
  id: string;
  name: string;
  color: string;
  colorLabel: Localized;
  imagePath: string;
  altText: Localized;
  visible: boolean;
  order: number;
};

export type DemoData = {
  product: {
    name: string;
    arabicName: string;
    description: Localized;
    capacity: string;
    packageType: Localized;
    uses: Localized[];
  };
  variants: Variant[];
  offer: {
    quantity: number;
    price: number;
    currency: string;
    active: boolean;
    startDate: string;
    endDate: string;
  };
  content: {
    heroTitle: Localized;
    heroSubtitle: Localized;
    benefits: Localized[];
    howTo: Localized[];
    cta: Localized;
  };
  faqs: { question: Localized; answer: Localized }[];
  settings: {
    whatsappNumber: string;
    whatsappNumberNeedsVerification: boolean;
    facebook: string;
    tiktok: string;
    pinterest: string;
    x: string;
    instagram: string;
    website: string;
    googleMapsListingUrl: string;
    googleReviewUrl: string;
    googleMapsEmbedUrl: string;
    address: Localized;
    latitude: string;
    longitude: string;
    pageTitle: Localized;
    pageDescription: Localized;
    socialImagePath: string;
  };
};
