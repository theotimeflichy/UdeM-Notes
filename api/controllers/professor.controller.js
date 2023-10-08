const { queryDatabase } = require("../config/db");

module.exports.getProfessor = async (req, res) => {

    const professor = req.params.professor;

    try {

        // Ensemble des notes à calculer.
        const notes = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F', 'W', '(S)', '(E)'];
        const selectClauses = notes.map((note) => `SUM(CASE WHEN grade = '${note}' THEN grade_number ELSE 0 END) AS '${note}'`);
        const selectClause = selectClauses.join(', ');

        // Permet de calculer la note la plus fréquente.
        const mostFrequentGrade = `(SELECT grade FROM courses WHERE professor = ? ORDER BY grade_number DESC LIMIT 1) AS mostFrequentGrade`;
        const mostFrequentGradeCourse = `(SELECT grade FROM courses WHERE title = title AND professor = ? ORDER BY grade_number DESC LIMIT 1) AS mostFrequentGrade`;

        // On calcul les résultats totaux et par professeur.
        const [overall, courses] = await Promise.all([
            queryDatabase(`SELECT ${selectClause}, ${mostFrequentGrade} FROM courses WHERE professor = ? GROUP BY professor;`, [`${professor}`, `${professor}`]),
            queryDatabase(`SELECT title, acronym, ${selectClause}, ${mostFrequentGradeCourse}, GROUP_CONCAT(DISTINCT session ORDER BY session ASC SEPARATOR ', ') AS sessions FROM courses WHERE professor = ? GROUP BY title,acronym;`, [`${professor}`, `${professor}`])
        ]);

        res.status(200).json({ overall: overall[0], courses });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error : " + err });
    }

};