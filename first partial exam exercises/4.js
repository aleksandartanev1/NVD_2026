function sumSpecialOrders(orders) {
    return orders.filter(order =>
    order.status === "completed" &&
    order.items.some(item => item.category === "electronics") &&
    order.items.every(item => item.quantity > 0)
    )
    .reduce((total, order) =>
        total + order.items.reduce((sum, item) => {
            const price = item.price * item.quantity
        return sum + (item.discounted ? price * 0.5 : price)
            }, 0)
        ,0)
}