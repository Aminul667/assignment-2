import { TOrder } from './orders.interface';
import { Order } from './orders.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  if (await Order.isUserExists(orderData.email)) {
    throw new Error('User already exists!');
  }

  const result = await Order.create(orderData);
  return result;
};

const getOrdersFromDB = async (searchEmail: string) => {
  let query = {};

  if (searchEmail) {
    query = { email: new RegExp(searchEmail, 'i') };
  }

  const result = await Order.find(query);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
};
