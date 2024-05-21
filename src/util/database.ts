import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'HOST',
    user: 'USER',
    database: 'SCHEMA/DATABASE NAME',
    password: 'PASSWORD'
});

export default pool.promise();