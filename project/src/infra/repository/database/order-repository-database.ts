import {
  Order,
  getOrderCode,
  getOrderCpf,
  getOrderFreight,
  getOrderItems,
} from '../../../domain/entity/order';
import {
  SaveOrder,
  CountOrders,
  ClearOrders,
} from '../../../domain/repository/order.repository';
import { Query } from '../../database';

const createSaveOrderDatabase = function(query: Query): SaveOrder {
  return async function(order: Order): Promise<void> {
    const [orderData] = await query(
      `INSERT INTO ccca.order (
      code,
      cpf,
      issue_date,
      freight,
      sequence,
      coupon
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    ) returning *`,
      [
        getOrderCode(order),
        getOrderCpf(order),
        order.date.toISOString(),
        getOrderFreight(order),
        order.sequence,
        order.coupon?.code,
      ],
    );

    for (const orderItem of getOrderItems(order)) {
      await query(
        `INSERT INTO ccca.order_item (
        id_item,
        id_order,
        price,
        quantity
      ) VALUES (
        $1,
        $2,
        $3,
        $4
      )`,
        [
          orderItem.idItem,
          orderData.id_order,
          orderItem.price,
          orderItem.quantity,
        ],
      );
    }
  };
};

const createCountOrdersDatabase = function(query: Query): CountOrders {
  return async function(): Promise<number> {
    const [orderData] = await query(
      'SELECT count(*)::int AS count FROM ccca.order',
      [],
    );
    return orderData.count;
  };
};

const createClearOrdersDatabase = function(query: Query): ClearOrders {
  return async function(): Promise<void> {
    await query('DELETE FROM ccca.order_item', []);
    await query('DELETE FROM ccca.order', []);
  };
};

export {
  createSaveOrderDatabase,
  createCountOrdersDatabase,
  createClearOrdersDatabase,
};
