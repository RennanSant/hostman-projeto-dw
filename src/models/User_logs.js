import Database from "../database/index.js";

async function load(data) {
    const db = await Database.connect();

    const {user, date} = data;

    const sql = `
        INSERT INTO user_logs
            (user, date)
        VALUES
            (?, ?)

    `;

    await db.run(sql, [user, date]);

    db.close();
}

async function readAll() {
    const db = await Database.connect();
    
    const sql = `SELECT * FROM user_logs`;

    const log = await db.all(sql);

    db.close();

    return log;

}



export default { load, readAll }; 