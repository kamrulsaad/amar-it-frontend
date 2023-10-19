import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createPackageSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  bandwidth: z.string({
    required_error: "Bandwidth is required",
  }),
  charge: z.string({
    required_error: "Charge is required",
  }),
  features: z.array(
    z.string({
      required_error: "Features is required",
    })
  ),
  serviceId: z.string({
    required_error: "Service is required",
  }),
});

const updatePackageSchema = z.object({
  title: z.string().optional(),
  bandwidth: z.string().optional(),
  charge: z.string().optional(),
  features: z.array(z.string()).optional(),
  serviceId: z.string().optional(),
});

export type CreatePackageFormType = z.infer<typeof createPackageSchema>;
export const createPackageResolver = zodResolver(createPackageSchema);

export type UpdatePackageFormType = z.infer<typeof updatePackageSchema>;
export const updateServiceResolver = zodResolver(updatePackageSchema);
