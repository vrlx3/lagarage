const client = require("./client");

const { columnNames, dollarMaker, updater } = require("./dbHelper");

//Adds vehicle license plate # to DB

async function createVehicles(licensePlate) {
  console.log("Function  Start");
  console.log("lic #", licensePlate);
  const { rows } = await client.query(`
  INSERT INTO vehicles (lic) VALUES (${licensePlate})
  RETURNING *
  ;`);
  console.log(rows);
  console.log("Function End");
}

module.exports = { createVehicles };
