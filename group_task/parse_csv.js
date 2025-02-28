// Importera filsystemmodulen för asynkrona operationer
const fs = require("fs/promises");

// Hämta kommandoradsargument
const args = process.argv;

// Funktion för att läsa CSV-fil och returnera headers och rader
async function readCSV(fileName, separator) {
  try {
    const data = await fs.readFile(fileName, "utf-8");
    const lines = data.split("\n");
    const headers = lines[0].split(separator);
    const rows = lines.slice(1);
    return [headers, rows];
  } catch (error) {
    throw new Error(`Error reading CSV file: ${error.message}`);
  }
}

// Funktion för att lägga till en ny rad i CSV-filen
async function appendCSV(fileName, newRow) {
  const data = await fs.readFile(fileName, "utf-8");
  const lines = data.split("\n");
  lines.push(newRow);
  await fs.writeFile(fileName, lines.join("\n"));
  console.log("Data appended successfully");
}

// Funktion för att ta bort en rad från CSV-filen baserat på ID
async function removeCSV(fileName, id) {
  const data = await fs.readFile(fileName, "utf-8");
  const lines = data.split("\n");
  const index = lines.findIndex((line) => line.split(";")[0] === id);
  if (index === -1) {
    throw new Error("No row found with id:", id);
  }
  lines.splice(index, 1);
  await fs.writeFile(fileName, lines.join("\n"));
  console.log("Row removed successfully");
}

/**
 * Huvudfunktionen som hanterar programflödet
 * Stödjer följande kommandon:
 * --file=<filnamn> : Anger vilken fil som ska användas
 * --action=<print|append|remove> : Anger vilken operation som ska utföras
 * --data=<JSON-sträng> : Data som ska läggas till (krävs för append)
 * --id=<användar-id> : ID på användaren som ska tas bort (krävs för remove)
 */
async function main() {
  // Parsa kommandoradsargument
  const fileName =
    args.find((arg) => arg.startsWith("--file="))?.split("=")[1] || "";
  if (!fileName) {
    console.error("Please provide a file name");
    process.exit(1);
  }
  // Sätt standardseparator till semikolon om ingen anges
  const separator =
    args.find((arg) => arg.startsWith("--separator="))?.split("=")[1] || ";";
  // Hämta önskad åtgärd från kommandoradsargument
  const action =
    args.find((arg) => arg.startsWith("--action="))?.split("=")[1] || "print";
  const data =
    args.find((arg) => arg.startsWith("--data="))?.split("=")[1] || "";
  const id = args.find((arg) => arg.startsWith("--id="))?.split("=")[1] || "";

  try {
    // Läs CSV-filen och utför vald åtgärd
    const [headers, rows] = await readCSV(fileName, separator);
    switch (action) {
      case "print": // Skriv ut headers och rader
        console.log(headers);
        console.log(rows);
        break;
      case "json": // Konvertera till JSON-format
        console.log(JSON.stringify({ headers, rows }));
        break;
      case "append": // Lägg till ny rad
        if (!data) {
          console.error("Please provide a data");
          process.exit(1);
        }
        await appendCSV(fileName, data);
        break;
      case "remove": // Ta bort rad baserat på ID
        if (!id) {
          console.error("Please provide an id");
          process.exit(1);
        }
        await removeCSV(fileName, id);
        break;
      default:
        console.error("Invalid action");
        process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Kör huvudfunktionen
main();
