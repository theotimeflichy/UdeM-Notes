const { queryDatabase } = require("../config/db");

module.exports.makeSearch = async (req, res) => {

    const s = req.params.s;

    try {

        const [departments, programs, courses, professors] = await Promise.all([
            queryDatabase('SELECT name, acronym FROM departments WHERE name LIKE ? OR acronym LIKE ?', [`%${s}%`, `%${s}%`]),
            queryDatabase('SELECT DISTINCT name FROM programs WHERE name LIKE ?', [`%${s}%`]),
            queryDatabase('SELECT DISTINCT title, acronym FROM courses WHERE title LIKE ? OR acronym LIKE ?', [`%${s}%`, `%${s}%`]),
            queryDatabase('SELECT DISTINCT professor FROM courses WHERE professor LIKE ?', [`%${s}%`])
        ]);

        let responseData = [];

        if (departments.length > 0 || programs.length > 0 || courses.length > 0 || professors.length > 0)
            responseData = { departments, programs, courses, professors };

        res.status(200).json(responseData);

    } catch (error) {
        res.status(500).json({ message: "An error occured during request : " + error });
    }

};
