import { Products } from '../products/products.model';
import { TOrder } from './orders.interface';
import { Order } from './orders.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const productId = orderData.productId;
  const productItem = await Products.findById(productId);

  if (!productItem) {
    throw new Error('Order not found');
  }

  // check for available quantity
  if (productItem.inventory.quantity < orderData.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  // reduce quantity after ordering a product
  productItem.inventory.quantity -= orderData.quantity;
  productItem.inventory.inStock = productItem.inventory.quantity > 0;
  await productItem.save();

  const result = await Order.create(orderData);
  return result;
};

const getOrdersFromDB = async (searchEmail: string) => {
  // a query for search option
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
