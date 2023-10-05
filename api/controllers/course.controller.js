const { queryDatabase } = require("../config/db");

module.exports.getCourse = async (req, res) => {
    const acronym = req.params.acronym;

    if (!(/^[a-zA-Z0-9]+$/.test(acronym)))
        return res.status(400).json({ message: "Error." });

    try {

        // Ensemble des notes à calculer.
        const notes = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F', 'W', '(S)', '(E)'];
        const selectClauses = notes.map((note) => `SUM(CASE WHEN grade = '${note}' THEN grade_number ELSE 0 END) AS '${note}'`);
        const selectClause = selectClauses.join(', ');

        // On calcul les résultats au total et par professeur.
        const [overall, byProfessor] = await Promise.all([
            queryDatabase(`SELECT title, acronym, ${selectClause}, GROUP_CONCAT(DISTINCT session ORDER BY session ASC SEPARATOR ', ') AS sessions FROM courses WHERE acronym = ? GROUP BY title LIMIT 1;`, [`${acronym}`]),
            queryDatabase(`SELECT professor, ${selectClause}, GROUP_CONCAT(DISTINCT session ORDER BY session ASC SEPARATOR ', ') AS sessions FROM courses WHERE acronym = ? GROUP BY title, professor;`, [`${acronym}`])
        ]);

        res.status(200).json({ overall: overall[0], byProfessor });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error." + err });
    }
};
