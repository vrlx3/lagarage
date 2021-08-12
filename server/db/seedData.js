// require in the database adapter functions as you write them (createUser, createActivity...)
const { createUser } = require("./");
const client = require("./client");

async function dropTables() {
  console.log("Dropping All Tables...");
  // drop all tables, in the correct order

  //  Add more tables as you need them
  try {
    await client.query(`
    DROP TABLE IF EXISTS vehicle_history;
    DROP TABlE IF EXISTS vehicle_owners;
    DROP TABLE IF EXISTS vehicles;
    DROP TABLE IF EXISTS users;
    
  `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    // create all tables, in the correct order

    // User's Table
    await client.query(`
      CREATE TABLE users(
        id  SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL
      );
      CREATE TABLE vehicles(
        id SERIAL PRIMARY KEY,
        lic VARCHAR(11) NOT NULL,
        status INT 
      );
      CREATE TABLE vehicle_owners(
        vehicle_id INT REFERENCES vehicles(id),
        user_id INT REFERENCES users(id)
      );
      CREATE TABLE vehicle_history(
        id SERIAL PRIMARY KEY,
        vehicle_id INT REFERENCES vehicles(id),
        date VARCHAR(11),
        status VARCHAR (11),
        notes VARCHAR (255)
      )


    `);

    // Add tables as you need them (A good place to start is Products and Orders
    // You may also need an extra table that links products and orders together (HINT* Many-To-Many)

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

/* 
ADD DATA BELOW AS NEEDED. This is default seed data, and will help you start testing
*/

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { username: "albert", password: "bertie99" },
      { username: "sandra", password: "sandra123" },
      { username: "glamgal", password: "glamgal123" },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();

    // create other data
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
