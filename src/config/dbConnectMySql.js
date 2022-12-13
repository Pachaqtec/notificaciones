const mysql = require('mysql2');

const { MY_SQL, MY_SQL_USER, MY_SQL_PASSWORD, MY_SQL_DB } = process.env;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: MY_SQL,
    user: MY_SQL_USER,
    database: MY_SQL_DB,
    password: MY_SQL_PASSWORD,
});
console.log(pool);
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'ENOTFOUND') {
            console.error('Error de conexion con la base de datos');
        }
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Usuario o contraseña incorrectos');
        }
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Base de datos desconectada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Base de datos con muchas conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Conexion rechazada');
        }
        if (err.code === 'ER_BAD_DB_ERROR') {
            console.error('Base de datos no existe');
        }
    }

    if (connection) {
        connection.release();
        console.log('Conexión a la base de datos establecida');
    }
});

const promisePool = pool.promise();

module.exports = promisePool;