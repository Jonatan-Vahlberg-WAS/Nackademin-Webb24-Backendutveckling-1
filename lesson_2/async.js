// Importera fs.promises för att kunna använda async/await med filsystem
const fs = require("fs").promises;

// Funktion som analyserar och visar information om filen
// Räknar längd, ord och rader
function getFileInfo(data = "") {
  const info = {
    length: data.length,
    words: data.split(" ").length,
    lines: data.split("\n").length,
  };
  console.log("File info:");
  console.log(info);
}

// Asynkron funktion som lägger till en loggrad i loggfilen
// Använder async/await för att hantera filoperationer
async function appendToLogFile(fileName) {
  // Skapa loggmeddelande med tidstämpel
  const logContent = `\n${new Date().toISOString()} - Read file ${fileName}`;

  try {
    // Läs befintlig loggfil
    const existingData = await fs.readFile("data/logs.txt", "utf-8");
    // Kombinera befintligt innehåll med nytt loggmeddelande
    const newContent = existingData + logContent;
    // Skriv tillbaka till filen
    await fs.writeFile("data/logs.txt", newContent);
    console.log("Log file updated");
  } catch (err) {
    // Om filen inte finns, skapa en ny med första loggmeddelandet
    if (err.code === "ENOENT") {
      await fs.writeFile("data/logs.txt", logContent);
      console.log("Created new log file");
      return;
    }
    // Kasta vidare andra fel
    throw err;
  }
}

// Asynkron funktion som hanterar resultatet av filläsningen
async function handleResult(data, fileName) {
  console.log("Data found:");
  try {
    // Visa filinformation och uppdatera loggen
    getFileInfo(data.toString());
    await appendToLogFile(fileName);
  } catch (error) {
    console.warn("Error processing file:", error);
  }
}

// Huvudfunktion som läser filen asynkront
async function readFileAsync(fileName) {
  try {
    // Läs filen och hantera resultatet
    const data = await fs.readFile(fileName);
    await handleResult(data, fileName);
  } catch (err) {
    console.warn("Error reading file:", err);
  }
}

// Hämta filnamnet från kommandoradsargument
const [, , fileName] = process.argv;

// Kontrollera om filnamn angetts
if (!fileName) {
  console.error("Please provide a file name as an argument");
  process.exit(1);
}

// Starta programmet
readFileAsync(fileName);
