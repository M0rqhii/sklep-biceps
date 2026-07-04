const router = require("express").Router();
const { products } = require("../data");

// GET /api/products - list all (with optional filters)
router.get("/", (req, res) => {
  let result = [...products];
  const { category, tag, search, sort, sale } = req.query;

  if (category) result = result.filter((p) => p.category === category);
  if (tag) result = result.filter((p) => p.tag === tag);
  if (sale === "true") result = result.filter((p) => p.oldPrice);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  res.json({ products: result, total: result.length });
});

// GET /api/products/:id - single product
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Produkt nie znaleziony" });
  res.json(product);
});

// GET /api/products/category/:category
router.get("/category/:category", (req, res) => {
  const result = products.filter((p) => p.category === req.params.category);
  res.json({ products: result, total: result.length });
});

module.exports = router;
