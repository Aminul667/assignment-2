import { z } from 'zod';

// Define Zod schemas corresponding to Mongoose schemas

const VariantValidationSchema = z.object({
  type: z.string({ message: 'Variant type must be a string.' }),
  value: z.string({ message: 'Variant value must be a string.' }),
});

const InventoryValidationSchema = z.object({
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer.' }),
  inStock: z.boolean({ message: 'InStock must be a boolean value.' }),
});

const ProductValidationSchema = z.object({
  name: z.string({ message: 'Product name must be a string.' }),
  description: z.string({ message: 'Product description must be a string.' }),
  price: z.number().positive({ message: 'Price must be a positive number.' }),
  category: z.string({ message: 'Category must be a string.' }),
  tags: z
    .array(z.string({ message: 'Each tag must be a string.' }))
    .nonempty({ message: 'Tags array cannot be empty.' }),
  variants: z
    .array(VariantValidationSchema)
    .nonempty({ message: 'Variants array cannot be empty.' }),
  inventory: InventoryValidationSchema,
  isDeleted: z
    .boolean({ message: 'IsDeleted must be a boolean value.' })
    .optional()
    .default(false),
});

// Export the Zod schemas
export default ProductValidationSchema;
