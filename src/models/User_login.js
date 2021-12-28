import Database from "../database/index.js";
import bcrypt from 'bcrypt';

async function  load(data) {
    const db = await Database.connect();

    const {user, password} = data;
    
    const sql = `
        INSERT INTO user_login
            (user, password)
        VALUES
            (?, ?)

    `;
    
    const hash = await bcrypt.hash(password, 10);
    await db.run(sql, [user, hash]);
    
    db.close();
};

async function readAll() {
    const db = await Database.connect();
    
    const sql = `SELECT * FROM user_login`;

    const allUserslogin = await db.all(sql);

    db.close();

    return allUserslogin;

};

async function readByUser(user) {
    const db = await Database.connect();
    
    const sql = `SELECT * FROM user_login
    WHERE user = ?
    `;

    const userlogin = await db.all(sql, [user]);

    db.close();
    
    return userlogin;

};


async function destroy(user) {
    const db = await Database.connect();
    
    const sql = `DELETE FROM user_login
    WHERE user = ?`;

    const userLogin = await db.run(sql, [user]);

    db.close();

    return 1;

}

export default { load, readAll, readByUser, destroy }; 