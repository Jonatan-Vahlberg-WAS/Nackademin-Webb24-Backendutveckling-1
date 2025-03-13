const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
})

categorySchema.virtual("slug").get(function() {
    return this.name.toLowerCase().replace(/ /g, "-")
})

categorySchema.set("toJSON", { virtuals: true })

const Category = mongoose.model("Category", categorySchema)

module.exports = Category