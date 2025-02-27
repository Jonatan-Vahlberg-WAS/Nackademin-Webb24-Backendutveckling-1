// Importera bibliotek
const Express = require('express')

// Skapa en express app
const app = Express()

// Första webbserver anrop som går till http://HOST:3000/
// ex. http://localhost:3000/
app.get("/",(req, res) => {
    console.log("Hello world!")
    
    // Skickar tillbaka text till användaren
    return res.send("Hej")
})

// Lystnar på komunikation utifrån
app.listen(3000, () => {
    console.log("Server listening on :3000")
},)
