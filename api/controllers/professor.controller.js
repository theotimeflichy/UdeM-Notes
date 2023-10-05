module.exports.getProfessor = async (req, res) => {

    try {
        const professorName = req.params.professor;

        res.status(200).json({});
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({ message: "Internal error." });
    }

};