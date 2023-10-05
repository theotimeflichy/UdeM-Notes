const express = require("express");
const { getDepartement } = require("../controllers/departement.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    res.status(400).json({ message: "Invalid request." });
});

router.get("/:departement", getDepartement);

module.exports = router