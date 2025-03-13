const express = require("express");
const router = express.Router();

const User = require("../models/user.model")

router.post("/register/", async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json({
            message: "User registered correctly"
        })
    } catch (error) {
        console.warn("Error registring user", error)
        res.status(400).json({
            error: "User unable to register"
        })
    }
})

module.exports = router