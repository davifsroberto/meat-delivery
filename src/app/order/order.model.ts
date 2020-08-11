class Order {
  constructor(
    public addres: string,
    public number: number,
    public optionalAddress: string,
    public paymentOption: string,
    public orderItems: OrderItem[] = []
  ) {}
}

class OrderItem {
  constructor(public quantity: number, public menuId: string) {}
}

export { Order, OrderItem };
