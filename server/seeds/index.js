const db = require('../config/connection');
require('dotenv').config();

const { User, Need } = require('../models');
const userSeeds = require("./userSeeds.json");
const needSeeds = require("./needSeeds.json");
const cleanDB = require("./cleanDB");

db.once('open', async () => {
    try {
        await cleanDB('Need', 'needs');
        await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < needSeeds.length; i++) {
        const { _id, needAuthor } = await Need.create(needSeeds[i]);
        const user = await User.findOneAndUpdate(
            { firstName: needAuthor },
            {
                $addToSet: {
                    needs: _id,
                },
            }
        );
    }
} catch (err) {
    console.error(err);
    process.exit(1);
}

console.log('all done!');
process.exit(0);
});

// async function seed() {
//     await User.create(data.user);
//     process.exit(0);
// }

// seed();