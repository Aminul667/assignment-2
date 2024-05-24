import { Request, Response } from 'express';
import ProductValidationSchema from './products.validation';
import { ProductServices } from './products.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    // data validation using zod
    const zodParsedData = ProductValidationSchema.parse(productData);

    //   will call service function to send this data
    const result = await ProductServices.createProductIntoDB(zodParsedData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await ProductServices.getProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const result = await ProductServices.updateProductFromDB(
      productId,
      productData,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// const getProductsBySearchTerm = async (req: Request, res: Response) => {
//   try {
//     const searchTerm = req.query.searchTerm as string;

//     if (!searchTerm) {
//       return res.status(400).send('searchTerm query parameter is required');
//     }

//     const result =
//       await ProductServices.getProductsBySearchTermFromDB(searchTerm);

//     console.log(result);

//     res.status(200).json({
//       success: true,
//       message: `Products matching search term '${searchTerm}' fetched successfully!`,
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'Something went wrong',
//       error: err,
//     });
//   }
// };

export const ProductControllers = {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  // getProductsBySearchTerm,
  updateProductController,
};
