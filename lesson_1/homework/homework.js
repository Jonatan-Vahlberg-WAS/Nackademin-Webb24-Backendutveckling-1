// Mockad databas (simulerad data)
const mockData = {
  "students.txt": {
    count: 42,
    active: true,
    courses: ["JavaScript", "Node.js", "MongoDB"],
    topStudent: {
      name: "Lisa",
      grade: "VG",
      attendance: 98.5,
    },
  },
  "config.txt": {
    server: {
      port: 3000,
      host: "localhost",
      debug: true,
    },
    database: "mongodb://localhost:27017",
    apiKeys: ["key1", "key2", "key3"],
  },
  "products.txt": {
    inventory: [
      { id: 1, name: "Laptop", price: 12999 },
      { id: 2, name: "Mouse", price: 599 },
      { id: 3, name: "Keyboard", price: 899 },
    ],
    totalValue: 14497,
    inStock: true,
  },
};

// Hämta argument från kommandoraden
// process.argv[0] är Node.js-sökvägen
// process.argv[1] är skriptets sökväg
// process.argv[2] och framåt är användarens argument
const [, , filename, key] = process.argv;

// Funktion för att validera indata
function validateInput(filename, key) {
  // Kontrollera om båda argumenten finns
  if (!filename || !key) {
    console.log("Ange både filnamn och nyckel.");
    return false;
  }

  // Kontrollera om filen har .txt-extension
  if (!filename.endsWith(".txt")) {
    console.log("Endast .txt-filer är tillåtna.");
    return false;
  }

  return true;
}

// Funktion för att hämta data från den mockade databasen
function getData(filename, key) {
  // Kontrollera om filen finns i databasen
  const file = mockData[filename]
  if (!file) {
    console.log("Filen finns inte.");
    return;
  }
  // Kontrollera om nyckeln finns i filen
  if (!(key in file)) {
    console.log("Nyckeln saknas.");
    return;
  }

  // Hämta och visa värdet
  const value = file[key];
  console.log(`Värde: ${JSON.stringify(value)}`);
}

// Huvudlogik
function main() {
  // Validera indata först
  if (validateInput(filename, key)) {
    // Om valideringen lyckas, hämta data
    getData(filename, key);
  }
}

// Kör programmet
main();
