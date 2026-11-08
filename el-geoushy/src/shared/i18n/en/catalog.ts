/** Categories listing + products listing + product detail. */
export const catalog = {
  categoriesPage: {
    title: "Product categories",
    subtitle: "Pick a category and see the products available in it.",
    crumb: "Categories",
  },
  productsPage: {
    title: "Products",
    subtitle: "Search the catalog and filter by category. Current products are demo data.",
    crumb: "Products",
    searchLabel: "Search for a product",
    searchPlaceholder: "Search for a product...",
    sortAria: "Sort",
    sorts: {
      featured: "Featured first",
      "name-asc": "Name: A → Z",
      "name-desc": "Name: Z → A",
    },
    filtersButton: "Filter",
    filterGroupAria: "Filter by category",
    byCategoryHeading: "Categories",
    drawerTitle: "Filter by category",
    drawerClose: "Close",
    countLabel: "products",
    noResultsTitle: "No results",
    noResultsText: "Try another keyword or clear the filters.",
  },
  detail: {
    sizes: "Available sizes",
    usage: "How to use",
    specs: "Specifications",
    related: "Related products",
    inquiry: (name: string) => `Hello, I'd like to ask about the product: ${name}`,
  },
};
