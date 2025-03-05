# **Hemuppgift: Bygg en enkel backend med GET och POST**

I den här uppgiften ska du skapa ett lite mer omfattande projekt som låter en klient göra följande:

1. **Hämta** data via en GET-förfrågan.
2. **Skicka** (lägga till) data via en POST-förfrågan.

Du behöver **inte** gå vidare till PUT/DELETE, men kan göra det som en **frivillig utmaning**.

Valfritt kan du även använda **query params** för enklare filtrering eller sökning.

---

## 1. Upplägg

- Skapa en **Express-app** i en ny mapp.
- Använd en **JSON-fil** för att lagra data (t.ex. en lista över uppgifter, produkter eller meddelanden).
- Hantera filen asynkront via `fs.promises`.

```
projektmapp/
├── data.json         # Här lagras dina objekt
├── server.js         # Huvudfil med Express-servern
└── package.json      # Skapas efter 'npm init -y'

```

---

## 2. GET – Hämta data

1. Skapa en **GET-route**, t.ex. `/items`, som läser alla poster från `data.json` och skickar tillbaka dem.
2. (Valfritt) Använd **query params** (ex: `GET /items?category=fruit`) för att filtrera resultatet.

```jsx
app.get('/items', async (req, res) => {
  // Om anropet är t.ex. /items?category=fruit
  const category = req.query.category;
  // ... läs data.json och filtrera om category finns
});

```

---

## 3. POST – Lägg till data

1. Skapa en **POST-route**, t.ex. `/items`, som tar emot JSON-data i request body.
2. Lägg till den nya posten i `data.json`.
3. Skicka tillbaka en bekräftelse eller den nyss skapade posten till klienten.
4. Hantera fel (t.ex. filen kan inte läsas/skrivas).

```json
// data.json
[
  { "id": 1, "name": "Äpple", "category": "fruit" },
  { "id": 2, "name": "Morot", "category": "vegetable" }
]

// POST /items
// Body: { "id": 3, "name": "Banan", "category": "fruit" }

```

---

## 4. Starta & testa

- Kör `node server.js` (eller `nodemon server.js`) och testa i webbläsaren eller med ett verktyg som *Postman*/*Insomnia*.
- `GET /items` bör visa en lista med posterna i `data.json`.
- `POST /items` bör lägga till en ny post i filen.
- Prova att lägga till query params i din GET, t.ex. `GET /items?category=fruit`.

---

## Extra utmaningar: Full CRUD

Om du vill utveckla din applikation ytterligare kan du lägga till:

1. **GET /items/:id** – Hämta en specifik post baserat på ett ID som skickas som route-parameter.
2. **PUT /items/:id** – Uppdatera en befintlig post genom att skriva över dess innehåll i `data.json`.
3. **DELETE /items/:id** – Ta bort en specifik post från `data.json`.

Genom att genomföra dessa steg får du en **full CRUD**-applikation (Create, Read, Update, Delete).