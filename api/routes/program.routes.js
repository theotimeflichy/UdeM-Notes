const express = require("express");
const { getProgram } = require("../controllers/program.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    res.status(400).json({ message: "Invalid request." });
});

router.get("/:program", getProgram);

module.exports = router