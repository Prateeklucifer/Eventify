import mysql from "mysql2/promise";

let pool;

export default function ConnectToDB() {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB_NAME,
            connectionLimit: 10
        })
    }

    return pool
}
