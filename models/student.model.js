const mongoose = require("mongoose")

// Define a schema that students follow
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    program: {
        type: String,
        required: true
    },
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student

