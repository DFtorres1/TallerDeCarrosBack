const { pool } = require("./../utils/connection");

const getReportsOut = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM reportout");

    for (const report of response.rows) {
      const reportIn = report.idrepin
      const responseReportIn = await pool.query(
        "SELECT * FROM reportin WHERE idrepin = $1",
        [reportIn]
      );
      const currentReportIn = responseReportIn.rows[0]

      const responseCar = await pool.query(
        "SELECT * FROM vehicle WHERE plate = $1",
        [currentReportIn.plate]
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

      currentReportIn.vehicle = currentCar

      report.reportIn = currentReportIn
    }

    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addReportOut = async (req, res) => {
  const { dni, exithour, idrepin } = req.body;

  try {
    const response = await pool.query(
      "INSERT INTO reportout ( dni, exithour, idrepin) VALUES ($1, $2, $3)",
      [dni, exithour, idrepin]
    );

    res.status(200).json({
      message: "Report added successfully",
      body: {
        dni: dni,
        exithour: exithour,
        idrepin: idrepin,
        res: response,
      },
    });
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getReportsOut,
  addReportOut,
};
