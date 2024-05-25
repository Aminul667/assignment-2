import { Schema, model } from 'mongoose';
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from './products.interface';

// Define Mongoose schemas
const VariantSchema = new Schema<TVariant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const InventorySchema = new Schema<TInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { _id: false },
);

const ProductSchema = new Schema<TProduct, ProductModel>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Query Middleware
ProductSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ProductSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ProductSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating custom static method
ProductSchema.statics.isUserExists = async function (name: string) {
  const existingProduct = await Products.findOne({ name });

  return existingProduct;
};

export const Products = model<TProduct, ProductModel>(
  'Products',
  ProductSchema,
);
