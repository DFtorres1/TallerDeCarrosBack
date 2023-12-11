const { pool } = require("./../utils/connection");

const getReportsIn = async (req, res) => {
  try {
    const response = await pool.query(`
      SELECT r.* 
      FROM reportin r 
      LEFT JOIN reportout ro ON r.idrepin = ro.idrepin 
      WHERE ro.idrepin IS NULL
    `);

    for (const report of response.rows) {
      const reportPlate = report.plate;
      const responseCar = await pool.query(
        "SELECT * FROM vehicle WHERE plate = $1",
        [reportPlate]
      );
      const currentCar = responseCar.rows[0];
      const carBrand = await pool.query(
        "SELECT * FROM brand WHERE idbrand = $1",
        [currentCar.idbrand]
      );
      const carModel = await pool.query(
        "SELECT * FROM model WHERE idmodel = $1",
        [currentCar.idmodel]
      );

      currentCar.brand = carBrand.rows[0].brandName;
      currentCar.model = carModel.rows[0].modelname;

      report.vehicle = currentCar;
    }

    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addReportIn = async (req, res) => {
  const { plate, dni, inhour, reason } = req.body;

  try {
    const existingReport = await pool.query(`
      SELECT * 
      FROM reportin r 
      LEFT JOIN reportout ro ON r.idrepin = ro.idrepin 
      WHERE r.plate = $1 AND ro.idrepin IS NULL
    `, [plate]);

    if (existingReport.rows.length > 0) {
      return res.status(400).json({
        error: "There is already a report with this plate in the waitlist"
      })
    }

    const response = await pool.query(
      `INSERT INTO reportin (plate, dni, inhour, reason) VALUES ($1, $2, $3, $4)`,
      [plate, dni, inhour, reason]
    );

    res.status(200).json({
      message: "Report added successfully",
      body: {
        plate: plate,
        dni: dni,
        inhour: inhour,
        reason: reason,
        res: response,
      },
    });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getReportsIn,
  addReportIn,
};
