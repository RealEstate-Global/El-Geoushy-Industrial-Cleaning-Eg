/** Categories listing + products listing + product detail. */
export const catalog = {
  categoriesPage: {
    title: "أقسام المنتجات",
    subtitle: "اختار القسم وشوف المنتجات المتاحة فيه.",
    crumb: "الأقسام",
  },
  productsPage: {
    title: "المنتجات",
    subtitle: "ابحث في الكتالوج وصفّي حسب القسم. المنتجات الحالية بيانات تجريبية.",
    crumb: "المنتجات",
    searchLabel: "ابحث عن منتج",
    searchPlaceholder: "ابحث عن منتج...",
    sortAria: "ترتيب",
    sorts: {
      featured: "المميزة أولًا",
      "name-asc": "الاسم: أ - ي",
      "name-desc": "الاسم: ي - أ",
    },
    filtersButton: "تصفية",
    filterGroupAria: "تصفية حسب القسم",
    byCategoryHeading: "الأقسام",
    drawerTitle: "تصفية حسب القسم",
    drawerClose: "إغلاق",
    countLabel: "منتج",
    noResultsTitle: "مفيش نتائج",
    noResultsText: "جرب كلمة بحث تانية أو امسح الفلاتر.",
  },
  detail: {
    sizes: "الأحجام المتاحة",
    usage: "طريقة الاستخدام",
    specs: "المواصفات",
    related: "منتجات مشابهة",
    inquiry: (name: string) => `مرحبًا، عايز أستفسر عن منتج: ${name}`,
  },
};
