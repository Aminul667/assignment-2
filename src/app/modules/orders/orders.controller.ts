import { OrderServices } from './orders.service';
import orderValidationSchema from './orders.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    // data validation using zod
    const zodParsedData = orderValidationSchema.parse(orderData);

    //   will call service function to send this data
    const result = await OrderServices.createOrderIntoDB(zodParsedData);

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
