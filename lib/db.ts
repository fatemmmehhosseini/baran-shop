import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

declare global {
  var mysqlPool: mysql.Pool | undefined;
}

const pool =
  global.mysqlPool ??
  mysql.createPool({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,

    ssl: {
      ca: fs.readFileSync(
        path.join(process.cwd(), "certs", "isrgrootx1.pem")
      ),
    },

    waitForConnections: true,

    connectionLimit: process.env.NODE_ENV === "production" ? 2 : 10,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

if (process.env.NODE_ENV !== "production") {
  global.mysqlPool = pool;
}

export default pool;