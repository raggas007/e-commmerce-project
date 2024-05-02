import * as Yup from "yup";

export let paginationProductSchema = Yup.object({
  page: Yup.number()
    .required("page is required")
    .default(1)
    .min(1, "minimum 1 page."),
  limit: Yup.number()
    .required("page limit is required.")
    .default(6)
    .min(1, "minimum limit is 1"),
  searchText: Yup.string().nullable().trim(),
});
