/**
 * En modul för att hantera JSON-filer med användardata
 * Stödjer operationer som att läsa, lägga till och ta bort användare
 */

const fs = require("fs/promises");

const args = process.argv;

/**
 * Läser och parsar en JSON-fil
 * @param {string} fileName - Sökvägen till JSON-filen
 * @returns {Object} - Det parsade JSON-objektet
 */
async function readJSON(fileName) {
  try {
    const data = await fs.readFile(fileName, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Fel vid läsning av JSON-fil: ${error.message}`);
  }
}

/**
 * Lägger till en ny användare i JSON-filen
 * @param {string} fileName - Sökvägen till JSON-filen
 * @param {string} newData - Den nya användaren som ska läggas till (i JSON-format)
 */
async function appendJSON(fileName, newData) {
  try {
    const data = await readJSON(fileName);
    // Kontrollera att JSON-strukturen innehåller en users-array
    if (!data.users) {
      throw new Error("Ogiltig JSON-struktur: users-array saknas");
    }
    data.users.push(JSON.parse(newData));
    await fs.writeFile(fileName, JSON.stringify(data, null, 4));
    console.log("Data har lagts till");
  } catch (error) {
    throw new Error(`Fel vid tillägg av data: ${error.message}`);
  }
}

/**
 * Tar bort en användare från JSON-filen baserat på ID
 * @param {string} fileName - Sökvägen till JSON-filen
 * @param {string} id - ID för användaren som ska tas bort
 */
async function removeJSON(fileName, id) {
  try {
    const data = await readJSON(fileName);
    // Kontrollera att JSON-strukturen innehåller en users-array
    if (!data.users) {
      throw new Error("Ogiltig JSON-struktur: users-array saknas");
    }
    const index = data.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error(`Användare med id ${id} hittades inte`);
    }
    data.users.splice(index, 1);
    await fs.writeFile(fileName, JSON.stringify(data, null, 4));
    console.log("Data har tagits bort");
  } catch (error) {
    throw new Error(`Fel vid borttagning av data: ${error.message}`);
  }
}

/**
 * Huvudfunktionen som hanterar kommandoradsargument och utför operationer
 * Stödjer följande kommandon:
 * --file=<filnamn> : Anger vilken fil som ska användas
 * --action=<print|append|remove> : Anger vilken operation som ska utföras
 * --data=<JSON-sträng> : Data som ska läggas till (krävs för append)
 * --id=<användar-id> : ID på användaren som ska tas bort (krävs för remove)
 */
async function main() {
  // Hämta filnamn från kommandoradsargument
  const fileName =
    args.find((arg) => arg.startsWith("--file="))?.split("=")[1] || "";
  if (!fileName) {
    console.error("Vänligen ange ett filnamn");
    process.exit(1);
  }

  // Hämta övriga argument
  const action =
    args.find((arg) => arg.startsWith("--action="))?.split("=")[1] || "print";
  const data =
    args.find((arg) => arg.startsWith("--data="))?.split("=")[1] || "";
  const id = args.find((arg) => arg.startsWith("--id="))?.split("=")[1] || "";

  try {
    const jsonData = await readJSON(fileName);
    // Utför vald operation
    switch (action) {
      case "print":
        console.log(JSON.stringify(jsonData, null, 2));
        break;
      case "append":
        if (!data) {
          console.error("Vänligen ange data att lägga till");
          process.exit(1);
        }
        await appendJSON(fileName, data);
        break;
      case "remove":
        if (!id) {
          console.error("Vänligen ange ett ID");
          process.exit(1);
        }
        await removeJSON(fileName, id);
        break;
      default:
        console.error("Ogiltig åtgärd");
        process.exit(1);
    }
  } catch (error) {
    console.error("Fel:", error.message);
    process.exit(1);
  }
}

main();
