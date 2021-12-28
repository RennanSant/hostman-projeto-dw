import Database from './index.js'

async function up() {
    const db = await Database.connect();
    
    db.run(`
    CREATE TABLE IF NOT EXISTS hosts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        user TEXT NOT NULL,
        syso TEXT NOT NULL,
        address TEXT NOT NULL,
        password TEXT NOT NULL
    )
    `);

    db.run(`
    CREATE TABLE IF NOT EXISTS user_login (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT NOT NULL,
        password TEXT NOT NULL
    ) 
    `);

    db.run(`
    CREATE TABLE IF NOT EXISTS user_logs (
        user TEXT NOT NULL,
        date NUMERIC NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    `);
}

export default { up };