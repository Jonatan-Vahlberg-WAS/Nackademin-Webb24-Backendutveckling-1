// Importera fs.promises för att kunna använda Promise-baserade filsystemoperationer
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

// Funktion som lägger till en loggrad i loggfilen
// Använder Promise-kedjor (.then) för att hantera filoperationer
function appendToLogFile(fileName) {
  // Skapa loggmeddelande med tidstämpel
  const logContent = `\n${new Date().toISOString()} - Read file ${fileName}`;

  return fs
    .readFile("data/logs.txt", "utf-8")
    .then((existingData) => {
      // Kombinera befintligt innehåll med nytt loggmeddelande
      const newContent = existingData + logContent;
      return fs.writeFile("data/logs.txt", newContent);
    })
    .then(() => {
      console.log("Log file updated");
    })
    .catch((err) => {
      // Om filen inte finns, skapa en ny med första loggmeddelandet
      if (err.code === "ENOENT") {
        return fs.writeFile("data/logs.txt", logContent).then(() => {
          console.log("Created new log file");
        });
      }
      // Kasta vidare andra fel
      throw err;
    });
}

// Funktion som hanterar resultatet av filläsningen
function handleResult(data, fileName) {
  console.log("Data found:");
  try {
    // Visa filinformation och uppdatera loggen
    getFileInfo(data.toString());

    return appendToLogFile(fileName).catch((err) => {
      console.warn("Error updating log file:", err);
    });
  } catch (error) {
    console.warn("Error processing file:", error);
  }
}

// Huvudfunktion som läser filen med Promise
function readFilePromise(fileName) {
  return fs
    .readFile(fileName)
    .then((data) => handleResult(data, fileName))
    .catch((err) => {
      console.warn("Error reading file:", err);
    });
}

// Hämta filnamnet från kommandoradsargument
const [, , fileName] = process.argv;

// Kontrollera om filnamn angetts
if (!fileName) {
  console.error("Please provide a file name as an argument");
  process.exit(1);
}

// Starta programmet
readFilePromise(fileName);
