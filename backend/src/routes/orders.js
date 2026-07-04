const router = require("express").Router();
const { products, carts, orders, users } = require("../data");
const auth = require("../middleware/auth");

// POST /api/orders - create order from cart
router.post("/", auth, (req, res) => {
  const cart = carts[req.user.id];
  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Koszyk jest pusty" });
  }

  const { address, city, postalCode, phone } = req.body;
  if (!address || !city || !postalCode || !phone) {
    return res.status(400).json({ error: "Wypełnij dane dostawy" });
  }

  const items = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      productId: item.productId,
      name: product?.name,
      price: product?.price,
      quantity: item.quantity,
    };
  });

  const total = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);
  const deliveryCost = total >= 150 ? 0 : 14.99;

  const order = {
    id: `ORD-${Date.now()}`,
    userId: req.user.id,
    items,
    subtotal: total,
    deliveryCost,
    total: total + deliveryCost,
    shipping: { address, city, postalCode, phone },
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  carts[req.user.id] = [];

  // Add loyalty points
  const user = users.find((u) => u.id === req.user.id);
  if (user) user.loyaltyPoints += Math.floor(total);

  res.status(201).json(order);
});

// GET /api/orders - user's orders
router.get("/", auth, (req, res) => {
  const userOrders = orders.filter((o) => o.userId === req.user.id);
  res.json(userOrders);
});

// GET /api/orders/:id
router.get("/:id", auth, (req, res) => {
  const order = orders.find((o) => o.id === req.params.id && o.userId === req.user.id);
  if (!order) return res.status(404).json({ error: "Zamówienie nie znalezione" });
  res.json(order);
});

module.exports = router;
