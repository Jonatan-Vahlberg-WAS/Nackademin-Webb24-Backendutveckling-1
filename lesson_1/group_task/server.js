const path = require("path")
const express = require("express");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/info", (req, res) => {
    res.send("Group task");
});

app.get("/", (req, res) => {
    const _path = path.join(__dirname, 'views/gallery.html')
    res.sendFile(_path, (err) => {
        console.warn("Error fetching gallery", err)
        res.sendFile(path.join(__dirname, 'views/404.html'))
    })
});

app.get("/blog", (req, res) => {
    const _path = path.join(__dirname, 'views/blog.html')
    res.sendFile(_path)
});

app.get("/contact", (req, res) => {
    const _path = path.join(__dirname, 'views/contact.html')
    res.sendFile(_path)
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 