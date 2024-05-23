import { TProduct } from './products.interface';
import { Products } from './products.model';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Products.isUserExists(productData.name)) {
    throw new Error('User already exists!');
  }

  const result = await Products.create(productData);
  return result;
};

const getProductsFromDB = async (searchTerm: string) => {
  let query = {};

  if (searchTerm) {
    query = { name: new RegExp(searchTerm as string, 'i') }; // Case-insensitive search
  }

  const result = await Products.find(query);
  return result;
};

// const getProductsFromDB = async () => {
//   const result = await Products.find();
//   return result;
// };

const getSingleProductFromDB = async (name: string) => {
  const result = await Products.findOne({ name });
  return result;
};

const deleteProductFromDB = async (name: string) => {
  const result = await Products.updateOne({ name }, { isDeleted: true });
  return result;
};

const getProductsBySearchTermFromDB = async (searchTerm: string) => {
  const query = {
    name: { $regex: searchTerm, $options: 'i' },
  };
  const result = await Products.find(query);

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  getProductsBySearchTermFromDB,
};
