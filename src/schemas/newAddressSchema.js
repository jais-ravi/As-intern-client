import { z } from "zod";

export const newAddressSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(100, { message: "Name should not exceed 100 characters." }),
  addressLine1: z
    .string()
    .min(1, { message: "Address Line 1 is required." })
    .max(200, { message: "Address Line 1 should not exceed 200 characters." }),
  addressLine2: z
    .string()
    .max(200, { message: "Address Line 2 should not exceed 200 characters." })
    .optional(),
  city: z
    .string()
    .min(1, { message: "City is required." })
    .max(100, { message: "City should not exceed 100 characters." }),
  state: z
    .string()
    .min(1, { message: "State is required." })
    .max(100, { message: "State should not exceed 100 characters." }),
  postalCode: z.string().regex(/^\d{5,9}(-\d{4})?$/, {
    message: "Postal Code must be a valid 5 to 9 digit ZIP code.",
  }),
  mobileNumber: z
    .string()
    .regex(/^(\+?\d{1,3}[- ]?)?\d{10}$/, {
      message: "Mobile Number must be a valid 10-digit phone number.",
    })
    .optional(),
  landmark: z
    .string()
    .max(200, { message: "Landmark should not exceed 200 characters." })
    .optional(),
});
