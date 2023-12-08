const { pool } = require("./../utils/connection");

const getBrands = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM brand");
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getModelsByBrand = async (req, res) => {
  try {
    const idbrand = req.params.idbrand;
    const response = await pool.query(
      "SELECT * FROM model WHERE idbrand = $1",
      [idbrand]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getBrands,
  getModelsByBrand,
};
