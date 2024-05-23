import { TProduct } from './products.interface';
import { Products } from './products.model';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Products.isUserExists(productData.name)) {
    throw new Error('User already exists!');
  }

  const result = await Products.create(productData);
  return result;
};

const getProductsFromDB = async () => {
  const result = await Products.find();
  return result;
};

const getSingleProductFromDB = async (name: string) => {
  const result = await Products.findOne({ name });
  return result;
};

const deleteProductFromDB = async (name: string) => {
  const result = await Products.updateOne({ name }, { isDeleted: true });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
};
