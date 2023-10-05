const express = require("express");
const { getCourse } = require("../controllers/course.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    res.status(400).json({ message: "Invalid request." });
});

router.get("/:acronym", getCourse);

module.exports = router