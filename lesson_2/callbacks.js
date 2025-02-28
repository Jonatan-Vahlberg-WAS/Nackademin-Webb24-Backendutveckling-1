// Importera traditionella callback-baserade fs-modulen
const fs = require("fs");

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
// Använder nästlade callbacks för att hantera filoperationer
function appendToLogFile(fileName, callback) {
  // Skapa loggmeddelande med tidstämpel
  const logContent = `\n${new Date().toISOString()} - Read file ${fileName}`;

  // Först läser vi den befintliga loggfilen
  fs.readFile("data/logs.txt", "utf-8", (readErr, existingData) => {
    // Kontrollera om filen inte finns eller annat fel uppstått
    if (readErr && readErr.code !== "ENOENT") {
      console.warn("Error reading log file:", readErr);
      return callback(readErr);
    }

    // Kombinera befintligt innehåll (om det finns) med nytt loggmeddelande
    const newContent = (existingData || "") + logContent;

    // Skriv det kombinerade innehållet tillbaka till filen
    fs.writeFile("data/logs.txt", newContent, (writeErr) => {
      if (writeErr) {
        console.warn("Error writing to log file:", writeErr);
        return callback(writeErr);
      }
      console.log("Log file updated");
      callback(null);
    });
  });
}

// Funktion som hanterar resultatet av filläsningen
function handleResult(err, data, fileName) {
  if (err) {
    return console.warn("Error reading file:", err);
  }

  console.log("Data found:");
  try {
    // Visa filinformation och uppdatera loggen
    getFileInfo(data.toString());

    // Uppdatera loggfilen och hantera eventuella fel
    appendToLogFile(fileName, (logErr) => {
      if (logErr) {
        console.warn("Error updating log file:", logErr);
      }
    });
  } catch (error) {
    console.warn("Error processing file:", error);
  }
}

// Huvudfunktion som läser filen med callback
function readFileCallback(fileName) {
  fs.readFile(fileName, (err, data) => handleResult(err, data, fileName));
}

// Hämta filnamnet från kommandoradsargument
const [, , fileName] = process.argv;

// Kontrollera om filnamn angetts
if (!fileName) {
  console.error("Please provide a file name as an argument");
  process.exit(1);
}

// Starta programmet
readFileCallback(fileName);
