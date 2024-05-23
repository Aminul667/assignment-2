import { z } from 'zod';

// Define Zod schemas corresponding to Mongoose schemas

const VariantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

const InventoryValidationSchema = z.object({
  quantity: z.number().int().positive(),
  inStock: z.boolean(),
});

const ProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  tags: z.array(z.string()).nonempty(),
  variants: z.array(VariantValidationSchema).nonempty(),
  inventory: InventoryValidationSchema,
  isDeleted: z.boolean().optional().default(false),
});

// Export the Zod schemas
export default ProductValidationSchema;
