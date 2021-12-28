import Database from "../database/index.js";

async function load(data) {
    const db = await Database.connect();

    const {name, user, address, password, syso} = data;
    
    const sql = `
        INSERT INTO hosts
            (name, user, syso, address, password)
        VALUES
            (?, ?, ?, ?, ?)

    `;

    await db.run(sql, [name, user, syso, address, password]);

    db.close();
};

async function readAll() {
    const db = await Database.connect();
    
    const sql = `SELECT * FROM hosts`;

    const hosts = await db.all(sql);

    db.close();

    return hosts;

};

async function readByID(id) {
    const db = await Database.connect();
    
    const sql = `SELECT * FROM hosts WHERE of = ?`;

    const hosts = await db.get(sql, [id]);

    db.close();

    return hosts;

};

async function destroy(id) {
    const db = await Database.connect();
    
    const sql = `DELETE FROM hosts
	WHERE id = ?`;

    const hosts = await db.run(sql, [id]);

    db.close();

    return 1;

}

export default { load, readAll, destroy, readByID }; 