const { queryDatabase } = require("../config/db");

module.exports.getDepartment = async (req, res) => {

    const department = req.params.department;

    if (!(/^[a-zA-Z0-9]+$/.test(department)))
        return res.status(400).json({ message: "Error." });

    try {

        // Ensemble des notes à calculer.
        const notes = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F', 'W', '(S)', '(E)'];
        const selectClauses = notes.map((note) => `SUM(CASE WHEN grade = '${note}' THEN grade_number ELSE 0 END) AS '${note}'`);
        const selectClause = selectClauses.join(', ');

        // On calcul les résultats totaux, par cours et on récupère les informations du département.
        const [info, overall, courses] = await Promise.all([
            queryDatabase(`SELECT * FROM departments WHERE acronym = ?;`, [`${department}`]),
            queryDatabase(`SELECT ${selectClause} FROM courses WHERE department = ? GROUP BY department;`, [`${department}`]),
            queryDatabase(`SELECT title, acronym, ${selectClause}, GROUP_CONCAT(DISTINCT session ORDER BY session ASC SEPARATOR ', ') AS sessions FROM courses WHERE department = ? GROUP BY title,acronym;`, [`${department}`])
        ]);

        res.status(200).json({ info: info[0], overall: overall[0], courses });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error." + err });
    }

};