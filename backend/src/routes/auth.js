const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../data");
const auth = require("../middleware/auth");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Wypełnij wszystkie pola" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Hasło musi mieć min. 8 znaków" });
    }
    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ error: "Email już zarejestrowany" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: `user_${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date().toISOString(),
      loyaltyPoints: 0,
    };

    users.push(user);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role || "user", loyaltyPoints: user.loyaltyPoints },
    });
  } catch (err) {
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role || "user", loyaltyPoints: user.loyaltyPoints },
    });
  } catch (err) {
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// GET /api/auth/me - get current user
router.get("/me", auth, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "Użytkownik nie znaleziony" });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role || "user", phone: user.phone, address: user.address, city: user.city, zip: user.zip, loyaltyPoints: user.loyaltyPoints });
});

module.exports = router;
