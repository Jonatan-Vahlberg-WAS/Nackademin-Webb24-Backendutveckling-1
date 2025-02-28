# Hemuppgift: Hantera argument i Node.js

Skriv ett Node.js-program som använder **`process.argv`** för att hantera användarinmatning och jobba med låtsasdata. Programmet ska göra följande:

---

### Uppgiftens krav:

1. Programmet tar emot två argument från terminalen:
    - Ett filnamn (t.ex. `data.txt`).
    - En nyckel (t.ex. `user` eller `settings`).
2. Validera inmatningen:
    - Om något argument saknas, logga: `Ange både filnamn och nyckel.`
    - Om filen inte slutar med `.txt`, logga: `Endast .txt-filer är tillåtna.`
3. Bearbeta låtsasdata:
    - Om filen inte finns i databasen, logga: `Filen finns inte.`
    - Om nyckeln inte hittas i filen, logga: `Nyckeln saknas.`
    - Annars logga värdet: `Värde: [VALUE]`.

---

```jsx
// Mockad databas
const mockData = {
    "data.txt": {
        user: "Alice",
        settings: { theme: "dark", notifications: true }
    },
    "info.txt": {
        user: "Bob",
        settings: { theme: "light", notifications: false }
    }
};

```

### Exempel på körning

### Terminalkommando:

```bash
node app.js data.txt user
```

### Output:

```bash
Värde: Alice
```

### Terminalkommando:

```bash
node app.js data.json user
```

### Output:

```bash
Endast .txt-filer är tillåtna.
```

<aside>
💡

Facit kommer efter lektion

</aside>