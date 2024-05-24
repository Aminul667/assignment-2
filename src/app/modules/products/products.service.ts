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

const getSingleProductFromDB = async (name: string) => {
  const result = await Products.findOne({ name });
  return result;
};

const deleteProductFromDB = async (name: string) => {
  const result = await Products.updateOne({ name }, { isDeleted: true });
  return result;
};

const updateProductFromDB = async (
  productId: string,
  productData: Partial<TProduct>,
) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      productData,
      { new: true },
    );
    return updatedProduct;
  } catch (error: any) {
    throw new Error('Error updating product: ' + error.message);
  }
};

// const getProductsBySearchTermFromDB = async (searchTerm: string) => {
//   const query = {
//     name: { $regex: searchTerm, $options: 'i' },
//   };
//   const result = await Products.find(query);

//   return result;
// };

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductFromDB,
  // getProductsBySearchTermFromDB,
};
