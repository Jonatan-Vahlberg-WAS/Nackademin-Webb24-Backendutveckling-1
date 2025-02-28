const express = require("express");
const fs = require("fs/promises")

const app = express();
const port = 3000;

// Tillåt inkommande JSON data
app.use(express.json());

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

async function saveStudents(students) {
    await fs.writeFile('data/students.json', JSON.stringify(students, null, 2))
}

async function createStudent(data) {
    if(!data.firstName || !data.lastName || !data.program){
        throw new Error("Invalid data")
    }
    const students = await getStudents()
    const newStudent = {
        id: Math.floor(Math.random() * 10000),
        firstName: data.firstName,
        lastName: data.lastName,
        program: data.program
    }

    students.push(newStudent)
    await saveStudents(students)
    return newStudent
    
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

app.post("/api/students/", async (req, res) => {
    const body = req.body
    try {
        const student = await createStudent(body)
        res.status(201).json(student)
    } catch (error) {
        console.warn("Error: creating student", error);
        res.status(400).json({
            error: error.message
        })  
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 