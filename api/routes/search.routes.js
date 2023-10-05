const express = require("express");
const { makeSearch } = require("../controllers/search.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    res.status(400).json({ message: "Invalid request." });
});

router.get("/:s", makeSearch);

module.exports = router