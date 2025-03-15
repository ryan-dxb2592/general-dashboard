import { Tag } from "emblor";
import { z } from "zod";

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  alternatePhone?: string;
  dateOfBirth: Date;
  tags: Tag[];
  source: string;
  currency: string;
  language: string;
  notes: string;
};

const contactFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  alternatePhone: z.string().min(1),
  dateOfBirth: z.date(),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
  source: z.string(),
  currency: z.string(),
  language: z.string(),
  notes: z.string(),
});

export { contactFormSchema, type ContactFormValues };
