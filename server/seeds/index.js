require('dotenv').config();

require('../config/connection');
const { User, Need } = require('../models');
const userSeeds = require("./userSeeds.json");
const needSeeds = require("./needSeeds.json")

db.once('open', async () => {
    try {

    await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
        const { _id, needAuthor } = await Need.create(thoughtSeeds[i]);
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