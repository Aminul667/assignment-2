import { TOrder } from './orders.interface';
import { Order } from './orders.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  if (await Order.isUserExists(orderData.email)) {
    throw new Error('User already exists!');
  }

  const result = await Order.create(orderData);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
};
