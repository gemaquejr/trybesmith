interface Order {
  id: number
  userId: number
  productsIds: number[] | undefined[]
}

export default Order;