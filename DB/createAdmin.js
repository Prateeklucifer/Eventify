// usage: node DB/createAdmin.js <name> <password>
require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

async function main() {
  const [name, password] = process.argv.slice(2);

  if (!name || !password) {
    console.log("usage: node DB/createAdmin.js <name> <password>");
    process.exit(1);
  }

  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
  });

  const hash = await bcrypt.hash(password, 10);
  await db.query("INSERT INTO users (name, password) VALUES (?, ?)", [name, hash]);

  console.log("admin created");
  await db.end();
}

main();
