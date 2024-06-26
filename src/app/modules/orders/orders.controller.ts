import { Request, Response } from 'express';
import { OrderServices } from './orders.service';
import orderValidationSchema from './orders.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // data validation using zod
    const zodParsedData = orderValidationSchema.parse(orderData);
    const result = await OrderServices.createOrderIntoDB(zodParsedData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Order not found' || err.message,
      // error: err,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const searchEmail = req.query.email as string;
    const result = await OrderServices.getOrdersFromDB(searchEmail);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
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

export const OrderControllers = {
  createOrder,
  getOrders,
};
