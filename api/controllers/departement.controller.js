const { queryDatabase } = require("../config/db");

module.exports.getDepartement = async (req, res) => {

    const departement = req.params.departement;

    if (!(/^[a-zA-Z0-9]+$/.test(departement)))
        return res.status(400).json({ message: "Error." });

    try {

        const notes = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F', 'W', '(S)', '(E)'];
        const selectClauses = notes.map((note) => `SUM(CASE WHEN grade = '${note}' THEN grade_number ELSE 0 END) AS '${note}'`);
        const selectClause = selectClauses.join(', ');

        const [info, overall, courses] = await Promise.all([
            queryDatabase(`SELECT * FROM departments WHERE acronym = ?;`, [`${departement}`]),
            queryDatabase(`SELECT ${selectClause} FROM courses WHERE department = ? GROUP BY department;`, [`${departement}`]),
            queryDatabase(`SELECT title, acronym, ${selectClause}, GROUP_CONCAT(DISTINCT session ORDER BY session ASC SEPARATOR ', ') AS sessions FROM courses WHERE department = ? GROUP BY title,acronym;`, [`${departement}`])
        ]);

        res.status(200).json({ info: info[0], overall: overall[0], courses });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error." + err });
    }

};