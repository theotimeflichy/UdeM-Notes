const { queryDatabase } = require("../config/db");

module.exports.getProfessor = async (req, res) => {

    const professor = req.params.professor;

    try {

        const notes = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F', 'W', '(S)', '(E)'];
        const selectClauses = notes.map((note) => `SUM(CASE WHEN grade = '${note}' THEN grade_number ELSE 0 END) AS '${note}'`);
        const selectClause = selectClauses.join(', ');

        const [overall, courses] = await Promise.all([
            queryDatabase(`SELECT ${selectClause} FROM courses WHERE professor = ? GROUP BY professor;`, [`${professor}`]),
            queryDatabase(`SELECT title, acronym, ${selectClause}, GROUP_CONCAT(DISTINCT session ORDER BY session ASC SEPARATOR ', ') AS sessions FROM courses WHERE professor = ? GROUP BY title,acronym;`, [`${professor}`])
        ]);

        res.status(200).json({ overall: overall[0], courses });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error." + err });
    }

};