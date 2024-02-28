import mysql from 'mysql2/promise';

let mysqlconn = null;

export function mysqlconnFn() {

    if (!mysqlconn) {
        mysqlconn = mysql.createConnection({ 
            host: import.meta.env.VITE_PGHOST,
            user: import.meta.env.VITE_PGUSER,
            password: import.meta.env.VITE_PGPASSWORD,
            database: import.meta.env.VITE_PGDATABASE,
        });
    }

    return mysqlconn;
}