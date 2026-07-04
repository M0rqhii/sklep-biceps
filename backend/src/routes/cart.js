const router = require("express").Router();
const { products, carts } = require("../data");
const auth = require("../middleware/auth");

// GET /api/cart
router.get("/", auth, (req, res) => {
  const cart = carts[req.user.id] || [];
  const items = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { product, quantity: item.quantity };
  }).filter((i) => i.product);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  res.json({ items, total, count: items.reduce((s, i) => s + i.quantity, 0) });
});

// POST /api/cart/add
router.post("/add", auth, (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = products.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ error: "Produkt nie znaleziony" });

  if (!carts[req.user.id]) carts[req.user.id] = [];
  const cart = carts[req.user.id];

  const existing = cart.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  res.json({ message: "Dodano do koszyka", cart });
});

// PUT /api/cart/update
router.put("/update", auth, (req, res) => {
  const { productId, quantity } = req.body;

  if (!carts[req.user.id]) return res.status(404).json({ error: "Koszyk pusty" });
  const cart = carts[req.user.id];

  if (quantity <= 0) {
    carts[req.user.id] = cart.filter((i) => i.productId !== productId);
  } else {
    const item = cart.find((i) => i.productId === productId);
    if (item) item.quantity = quantity;
  }

  res.json({ message: "Koszyk zaktualizowany", cart: carts[req.user.id] });
});

// DELETE /api/cart/clear
router.delete("/clear", auth, (req, res) => {
  carts[req.user.id] = [];
  res.json({ message: "Koszyk wyczyszczony" });
});

module.exports = router;
