import Order from 'src/domain/entity/Order.ts';
import OrderRepository from 'src/domain/repository/OrderRepository.ts';
import Connection from 'src/infra/database/Connection.ts';

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const [orderData] = await this.connection.query(
      `INSERT INTO ccca.order (
        code,
        cpf,
        issue_date,
        freight,
        sequence,
        coupon
      ) VALUES (
        '${order.getCode()}',
        '${order.getCpf()}',
        '${order.date.toISOString()}',
        ${order.getFreight()},
        ${order.sequence},
        '${order.coupon?.code ?? ''}'
      ) returning *`,
    );

    for (const orderItem of order.getOrderItems()) {
      await this.connection.query(
        `INSERT INTO ccca.order_item (
          id_item,
          id_order,
          price,
          quantity
        ) VALUES (
          ${orderItem.idItem},
          ${orderData.id_order},
          ${orderItem.price},
          ${orderItem.quantity}
        )`,
      );
    }
  }

  async count(): Promise<number> {
    const [orderData] = await this.connection.query(
      `SELECT count(*)::int AS count FROM ccca.order`,
    );
    return orderData.count;
  }

  async clear(): Promise<void> {
    await this.connection.query('DELETE FROM ccca.order_item');
    await this.connection.query('DELETE FROM ccca.order');
  }
}
