import Migration from './migration.js'
import Seed from './seeders.js';


async function load() {
    await Migration.up();
    console.log('Running migrations.');
    
    await Seed.up();
    console.log('Running Seeders');
    
};

load();