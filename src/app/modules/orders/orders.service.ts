import { Products } from '../products/products.model';
import { TOrder } from './orders.interface';
import { Order } from './orders.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  // if (await Order.isUserExists(orderData.email)) {
  //   throw new Error('User already exists!');
  // }

  const productId = orderData.productId;
  const productItem = await Products.findById(productId);

  console.log(productItem);

  if (!productItem) {
    throw new Error('Order not found');
  }

  if (productItem.inventory.quantity < orderData.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  productItem.inventory.quantity -= orderData.quantity;
  productItem.inventory.inStock = productItem.inventory.quantity > 0;
  await productItem.save();

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
