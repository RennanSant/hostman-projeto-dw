import path from 'path';
import fs from 'fs';
import Hosts from '../models/Hosts.js';
import User_login from '../models/User_login.js';
import User_logs from '../models/User_logs.js';


async function up(){
    const seedersPath = path.join('src', 'database', 'seeders.json')

    const seedersContent = fs.readFileSync(seedersPath);

    const seeders = await JSON.parse(seedersContent);

    // for (const host of seeders.hosts) {
    //     await Hosts.load(host);
    // };

    // for (const userlog of seeders.user_logs) {
    //     await User_logs.load(userlog);
    // };

    for (const user of seeders.user_login) {
        await User_login.load(user);
    };
};

export default { up };