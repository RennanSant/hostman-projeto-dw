import path from 'path';
import Database from 'sqlite-async';

const databasePath = path.join('src','database', 'database.sqlite');

async function connect() {
    return await Database.open(databasePath);
};

export default { connect };
