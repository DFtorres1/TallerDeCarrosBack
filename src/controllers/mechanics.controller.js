const { pool } = require("./../utils/connection");

const getMechanics = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM worker");
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addMechanic = async (req, res) => {
  const { dni, name, idRole } = req.body;

  try {
    const response = await pool.query(
      "INSERT INTO worker (dni, name, idRole) VALUES ($1, $2, $3)",
      [dni, name, idRole]
    );

    res.status(200).json({
      message: "worker added successfully",
      body: {
        dni: dni,
        name: name,
        idRole: idRole,
      },
    });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getMechanics,
  addMechanic,
};
