const { queryDatabase } = require("../config/db");

module.exports.getProgram = async (req, res) => {

    const program = req.params.program;

    try {

        const notes = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F', 'W', '(S)', '(E)'];
        const selectClauses = notes.map((note) => `SUM(CASE WHEN grade = '${note}' THEN grade_number ELSE 0 END) AS '${note}'`);
        const selectClause = selectClauses.join(', ');

        const courseList = await queryDatabase(`SELECT course FROM programs WHERE name = ? GROUP BY course;`, [`${program}`]);
        const overall = await queryDatabase(`SELECT ${selectClause}, GROUP_CONCAT(DISTINCT session ORDER BY session ASC SEPARATOR ', ') AS sessions FROM courses WHERE acronym IN (${courseList.map((a) => `'${a.course}'`).join(', ')});`);

        const results = await Promise.all(courseList.map(async (courseObj) => {
            const acronym = courseObj.course;
            const overallQuery = `SELECT title, acronym, ${selectClause}, GROUP_CONCAT(DISTINCT session ORDER BY session ASC SEPARATOR ', ') AS sessions FROM courses WHERE acronym = ? GROUP BY title; `;

            const overallData = await queryDatabase(overallQuery, [acronym]);

            return overallData[0];
        }));

        res.status(200).json({ overall: overall, courses: results });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error." + err });
    }

};