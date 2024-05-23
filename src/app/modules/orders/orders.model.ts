import { Schema, model } from 'mongoose';
import { OrderModel, TOrder } from './orders.interface';

const orderSchema = new Schema<TOrder, OrderModel>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// creating custom static method
orderSchema.statics.isUserExists = async function (email: string) {
  const existingOrder = await Order.findOne({ email });

  return existingOrder;
};

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
