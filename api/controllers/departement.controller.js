module.exports.getDepartement = async (req, res) => {

    const departement = req.params.departement;

    if (!(/^[a-zA-Z0-9]+$/.test(departement)))
        return res.status(400).json({ message: "Error." });

    try {

        res.status(200).json({});

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error." + err });
    }

};