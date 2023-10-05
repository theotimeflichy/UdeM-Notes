const express = require("express");
const { getDepartment } = require("../controllers/department.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    res.status(400).json({ message: "Invalid request." });
});

router.get("/:department", getDepartment);

module.exports = router