// Importera nödvändiga paket
const Express = require("express");
const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");

// Definiera port för servern, använd miljövariabel eller standard 3000
const PORT = process.env.PORT || 3000;

// Initiera Express applikationen
const app = Express();

// -- Middlewares --
app.use(Express.static('public'))

// --- Route Hanterare ---

// Grundläggande route som svarar på GET-förfrågan till rotsökvägen '/'
app.get("/", (req, res) => {
  console.log("Besök på startsidan");
  return res.send("Hej");
});

// Route som returnerar information om servern i JSON-format
app.get("/info/", (req, res) => {
  const info = {
    name: "First webserver",
    date: new Date().toISOString(),
    siteMap: {
      "GET:/": "Hello world",
      "GET:/info/": "This page :)",
    },
  };

  return res.json(info);
});

// Route som returnerar en lista med kurser i JSON-format
app.get("/courses/", (req, res) => {
  const courses = [
    {
      name: "Physics",
      startDate: "1/3/2025",
    },
    {
      name: "Math",
      startDate: "7/4/2025",
    },
  ];

  return res.json(courses); // Använd res.json istället för JSON.stringify
});

// Route som serverar en HTML-fil med callback-hantering
app.get("/website/", (req, res) => {
  const filePath = path.join(__dirname, "index.html");

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(404).send("404 Not Found");
    }

    res.set("Content-Type", "text/html");
    return res.send(data);
  });
});

// Route som serverar samma HTML-fil men med Promise-baserad hantering
app.get("/website/promise", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "index.html");
    const htmlFile = await fsPromises.readFile(filePath);

    res.set("Content-Type", "text/html");
    return res.send(htmlFile);
  } catch (error) {
    return res.status(404).send("404 Not Found");
  }
});

// Starta servern och lyssna på angiven port
app.listen(PORT, () => {
  console.log(`Server lyssnar på port: ${PORT}`);
});
