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
    const result = await ProductServices.getProductsFromDB();

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
    const productName = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(productName);

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

export const ProductControllers = {
  createProduct,
  getProducts,
  getSingleProduct,
};
