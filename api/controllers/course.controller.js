const { queryDatabase } = require("../config/db");

module.exports.getCourse = async (req, res) => {
    const acronym = req.params.acronym;

    if (!(/^[a-zA-Z0-9]+$/.test(acronym)))
        return res.status(400).json({ message: "Error." });

    try {

        //let sql = "SELECT title, SUM(CASE WHEN grade = 'A+' THEN grade_number ELSE 0 END) AS 'A+', SUM(CASE WHEN grade = 'A' THEN grade_number ELSE 0 END) AS 'A', SUM(CASE WHEN grade = 'A-' THEN grade_number ELSE 0 END) AS 'A-', SUM(CASE WHEN grade = 'B+' THEN grade_number ELSE 0 END) AS 'B+', SUM(CASE WHEN grade = 'B' THEN grade_number ELSE 0 END) AS 'B', SUM(CASE WHEN grade = 'B-' THEN grade_number ELSE 0 END) AS 'B-', SUM(CASE WHEN grade = 'C+' THEN grade_number ELSE 0 END) AS 'C+', SUM(CASE WHEN grade = 'C' THEN grade_number ELSE 0 END) AS 'C', SUM(CASE WHEN grade = 'C-' THEN grade_number ELSE 0 END) AS 'C-', SUM(CASE WHEN grade = 'D+' THEN grade_number ELSE 0 END) AS 'D+', SUM(CASE WHEN grade = 'D' THEN grade_number ELSE 0 END) AS 'D', SUM(CASE WHEN grade = 'E' THEN grade_number ELSE 0 END) AS 'E', SUM(CASE WHEN grade = 'F' THEN grade_number ELSE 0 END) AS 'F', SUM(CASE WHEN grade = 'W' THEN grade_number ELSE 0 END) AS 'W', SUM(CASE WHEN grade = '(S)' THEN grade_number ELSE 0 END) AS '(S)', SUM(CASE WHEN grade = '(E)' THEN grade_number ELSE 0 END) AS '(E)' FROM courses WHERE acronym = ? GROUP BY title;"

        const notes = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F', 'W', '(S)', '(E)'];
        const selectClauses = notes.map((note) => `SUM(CASE WHEN grade = '${note}' THEN grade_number ELSE 0 END) AS '${note}'`);
        const selectClause = selectClauses.join(', ');

        const [overall, byProfessor] = await Promise.all([
            queryDatabase(`SELECT title, acronym, ${selectClause}, GROUP_CONCAT(DISTINCT session ORDER BY session ASC SEPARATOR ', ') AS sessions FROM courses WHERE acronym = ? GROUP BY title;`, [`${acronym}`]),
            queryDatabase(`SELECT professor, ${selectClause}, GROUP_CONCAT(DISTINCT session ORDER BY session ASC SEPARATOR ', ') AS sessions FROM courses WHERE acronym = ? GROUP BY title, professor;`, [`${acronym}`])
        ]);

        res.status(200).json({ overall, byProfessor });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error." + err });
    }
};
