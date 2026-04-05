export const DEBOUNCE_WAIT = 400;

export const SORT_OPTIONS = [
  {
    label: "Сначала новые",
    value: "createdAt_desc",
  },
  {
    label: "Сначала старые",
    value: "createdAt_asc",
  },
  {
    label: "Сначала дешевле",
    value: "price_asc",
  },
  {
    label: "Сначала дороже",
    value: "price_desc",
  },
  {
    label: "А → Я",
    value: "title_asc",
  },
  {
    label: "Я → А",
    value: "title_desc",
  },
];
