import Yup from "yup";

export const productValidationSchema = Yup.object({
  name: Yup.string()
    .required("name is required")
    .trim()
    .max(55, "maximum character of name is 55 "),
  brand: Yup.string()
    .required("brand is required")
    .trim()
    .max(55, "maximum character of brand is 55 "),
  price: Yup.number()
    .required("price is required.")
    .min(0, "minimum price should be 0."),
  quantity: Yup.number()
    .required("quantity is required.")
    .min(1, "minimum quantity should be 1."),
  description: Yup.string()
    .required("description is required")
    .trim()
    .min(500, "the description should be at least 500 characters.")
    .max(1000, "the description should be not more than 1000 characters."),

  category: Yup.string()
    .required("category is required.")
    .trim()
    .oneOf([
      "electronics",
      "kitchen",
      "clothing",
      "shoes",
      "grocery",
      "automobiles",
      "sports",
      "cosmetics",
      "furniture",
      "liquor",
      "glasses",
      "accessory",
      "toy",
    ]),
  freeShipping: Yup.boolean().default(false),
  image: Yup.string().nullable().trim(),
});
