# 💪 BICEPS — Sklep z Suplementami

Demo/edukacyjny projekt sklepu internetowego z suplementami diety: katalog produktów z filtrowaniem, koszyk, konto użytkownika (JWT) i składanie zamówień. Dane produktów i kont w `backend/src/data.js` są przykładowe (seed), nie produkcyjne — nie jest to gotowa do wdrożenia platforma e-commerce.

## Stack
- **Frontend**: Next.js 15 + React 19 + Tailwind CSS 4 + TypeScript
- **Backend**: Node.js + Express
- **Auth**: JWT + bcrypt

## Uruchomienie

### Backend
```bash
cd backend
npm install
```
Stwórz plik `.env` w `backend/` z sekretem do podpisywania JWT:
```
JWT_SECRET=twoj-wlasny-sekret
PORT=5000
```
```bash
npm run dev    # → http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev    # → http://localhost:3000
```

## API Endpoints

### Produkty
- `GET /api/products` — lista (filtry: ?category, ?tag, ?search, ?sort, ?sale)
- `GET /api/products/:id` — szczegóły produktu

### Auth
- `POST /api/auth/register` — rejestracja (name, email, password)
- `POST /api/auth/login` — logowanie (email, password)
- `GET /api/auth/me` — profil (wymaga tokena)

### Koszyk (wymaga tokena)
- `GET /api/cart` — pokaż koszyk
- `POST /api/cart/add` — dodaj (productId, quantity)
- `PUT /api/cart/update` — zmień ilość (productId, quantity)
- `DELETE /api/cart/clear` — wyczyść

### Zamówienia (wymaga tokena)
- `POST /api/orders` — złóż zamówienie (address, city, postalCode, phone)
- `GET /api/orders` — lista zamówień
- `GET /api/orders/:id` — szczegóły zamówienia

## Strony
- `/` — strona główna
- `/produkty` — listing produktów z filtrami
- `/produkt/:id` — szczegóły produktu
- `/koszyk` — koszyk
- `/logowanie` — logowanie
- `/rejestracja` — rejestracja
