const { queryDatabase } = require("../config/db");

module.exports.getCourse = async (req, res) => {
    const acronym = req.params.acronym;

    if (!(/^[a-zA-Z0-9]+$/.test(acronym)))
        return res.status(400).json({ message: "Error." });

    try {

        // Permet de regrouper les notes.
        const notes = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F', 'W', '(S)', '(E)'];
        const selectClauses = notes.map((note) => `SUM(CASE WHEN grade = '${note}' THEN grade_number ELSE 0 END) AS '${note}'`);
        const selectClause = selectClauses.join(', ');

        // Permet de calculer la note la plus fréquente.
        const mostFrequentGrade = `(SELECT grade FROM courses WHERE acronym = ? ORDER BY grade_number DESC LIMIT 1) AS mostFrequentGrade`;
        const mostFrequentGradeProfessor = `(SELECT grade FROM courses WHERE professor = nameOfProfessor AND acronym = ? ORDER BY grade_number DESC LIMIT 1) AS mostFrequentGrade`;

        // On calcule les résultats au total et par professeur.
        const [overall, byProfessor] = await Promise.all([
            queryDatabase(`SELECT title, acronym, ${selectClause}, ${mostFrequentGrade}, GROUP_CONCAT(DISTINCT session ORDER BY session ASC SEPARATOR ', ') AS sessions FROM courses WHERE acronym = ? GROUP BY title LIMIT 1;`, [`${acronym}`, `${acronym}`]),
            queryDatabase(`SELECT professor AS nameOfProfessor, ${selectClause}, ${mostFrequentGradeProfessor}, GROUP_CONCAT(DISTINCT session ORDER BY session ASC SEPARATOR ', ') AS sessions FROM courses WHERE acronym = ? GROUP BY title, professor;`, [`${acronym}`, `${acronym}`])
        ]);

        res.status(200).json({ overall: overall[0], byProfessor }); // Ajoutez la note la plus fréquemment attribuée à la réponse.

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error." + err });
    }
};

