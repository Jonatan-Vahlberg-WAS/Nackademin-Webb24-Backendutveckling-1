const fs = require('fs')

console.log("Lektion 2")

function handleReadFileCalbackResult(err, data) {
    if(err){
        console.warn("Error reading file:", err)
    }

    console.log("Data found:")
    console.log(data.toString().length)
}

// Hanterar callback funktioner asynkront
function readFileCallback(fileName) {
    fs.readFile(fileName, handleReadFileCalbackResult)
}

const [,, fileName] = process.argv

readFileCallback(fileName,'utf8')