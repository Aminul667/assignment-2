import { TProduct } from './products.interface';
import { Products } from './products.model';

// create and save product into the database
const createProductIntoDB = async (productData: TProduct) => {
  const result = await Products.create(productData);
  return result;
};

// get all the product from the database
const getProductsFromDB = async (searchTerm: string) => {
  let query = {};

  if (searchTerm) {
    query = { name: new RegExp(searchTerm as string, 'i') };
  }

  const result = await Products.find(query);
  return result;
};

// get a single product form the database by id
const getSingleProductFromDB = async (id: string) => {
  const result = await Products.findById(id);
  return result;
};

// delete a product by id
const deleteProductFromDB = async (id: string) => {
  const result = await Products.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

// update a product in the database
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

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductFromDB,
};
