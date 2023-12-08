const { pool } = require("./../utils/connection");

const getVehicle = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM vehicle");
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addVehicle = async (req, res) => {
  const { plate, owner, color, idbrand, idmodel } = req.body;

  try {
    const vehicleExists = await pool.query(
      "SELECT * FROM vehicle WHERE plate = $1",
      [plate]
    );

    if (vehicleExists.rows.length == 0) {
      const createCar = await pool.query(
        "INSERT INTO vehicle (plate, owner, color, idbrand, idmodel) VALUES ($1, $2, $3, $4, $5)",
        [plate, owner, color, idbrand, idmodel]
      );
    }

    const responseVehicle = await pool.query(
      "SELECT * FROM vehicle WHERE plate = $1",
      [plate]
    );
    res.status(200).json(responseVehicle.rows);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getVehicle,
  addVehicle,
};
