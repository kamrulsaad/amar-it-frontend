import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  charge: z.string({
    required_error: "Charge is required",
  }),
  features: z.array(
    z.string({
      required_error: "Features is required",
    })
  ),
});

const updateServiceSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  charge: z.string().optional(),
  features: z.array(z.string()).optional(),
  status: z.enum(["active", "upcoming"]).optional(),
});

export type CreateServiceFormType = z.infer<typeof createServiceSchema>;
export const createServiceResolver = zodResolver(createServiceSchema);

export type UpdateServiceFormType = z.infer<typeof updateServiceSchema>;
export const updateServiceResolver = zodResolver(updateServiceSchema);
