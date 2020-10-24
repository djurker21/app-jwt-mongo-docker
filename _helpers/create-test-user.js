const bcrypt = require('bcryptjs');
const models = require('../models');
const Role = require('./role');

module.exports = createTestUser;

async function createTestUser() {
    // create test user if the db is empty
    const usersCount = await models.User.count();
    if (usersCount === 0) {
        const user = models.User.build({
            firstName: 'Test',
            lastName: 'User',
            username: 'test',
            email: "test@te.st",
            passwordHash: bcrypt.hashSync('test', 10),
            role: Role.Admin
        });
        await user.save();
    }
}