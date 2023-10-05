const express = require("express");
const { getProfessor } = require("../controllers/professor.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    res.status(400).json({ message: "Invalid request." });
});

router.get("/:professor", getProfessor);

module.exports = router