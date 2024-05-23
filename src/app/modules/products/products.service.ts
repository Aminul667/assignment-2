import { TProduct } from './products.interface';
import { Products } from './products.model';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Products.isUserExists(productData.name)) {
    throw new Error('User already exists!');
  }

  const result = await Products.create(productData);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
};
