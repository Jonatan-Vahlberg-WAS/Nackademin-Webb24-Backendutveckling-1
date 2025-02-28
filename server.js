const express = require("express");
const fs = require("fs/promises")

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("API")
});

async function getStudents(program) {
    const result = await fs.readFile('data/students.json', "utf-8");
    let students = JSON.parse(result)
    if(program) {
        students = students.filter(student => student.program === program);
    }
    return students
}

app.get("/api/students/", async (req, res) => {
    const program = req.query.program
    console.log(program)
    try {
        const students = await getStudents(program);
        res.json(students);
    } catch (error) {
        console.warn("Error: fetching students", error);
        res.status(500).json({
            error: "Error fetching students"
        })   
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 