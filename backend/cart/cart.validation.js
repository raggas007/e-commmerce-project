import * as Yup from "yup";

export let addCartItemValidationSchema = Yup.object({
  productId: Yup.string().required("product id is required").trim(),
  orderedQuantity: Yup.number()
    .required("order quantity is required.")
    .min(1, "minimum order quantity should be at least 1"),
});
