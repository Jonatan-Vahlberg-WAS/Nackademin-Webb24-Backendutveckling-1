const fs = require("fs")
console.log("Server arguments")
console.log(process.argv)

//Argv - Argumment som alltid finns
// Node + fil 
// process.argv[0] process.argv[1]

const _arguments = process.argv.slice(2)

function readFile() {
    const file = _arguments?.[0]
    if(!file) {
        throw new Error("File argument not found")
    }
    fs.readFile(file, (err,data) => {
        if(err) {
            throw new Error("File not found");
        }
        console.log("error", err);
        const readableData = data.toString()
        const words = readableData.split(" ");
        const censoredWords = words.map(w => w === "björnbär" ? "****" : w)
        console.log(censoredWords.join(" "))
        // console.log(readableData)
    })
}

readFile()