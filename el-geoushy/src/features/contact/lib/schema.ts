import { z } from "zod";

/**
 * Contact form validation, shared by the form and its tests.
 * Messages are short error codes; the UI maps them to locale strings
 * (see `d.contact.form.errors` in the i18n dictionaries).
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(80, "name"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?20)?0?1[0125]\d{8}$/, "phone"),
  email: z.union([z.literal(""), z.string().trim().email("email")]),
  subject: z.string().trim().min(3, "subject").max(120, "subject"),
  message: z.string().trim().min(10, "message").max(2000, "message"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
/** The error codes the schema raises, mapped to locale strings in the UI. */
export type ContactErrorCode = "name" | "phone" | "email" | "subject" | "message";
