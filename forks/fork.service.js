const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById
};

async function getAll() {
    const forks = await db.Fork.find();
    return forks.map(x => basicDetails(x));
}

async function getById(id) {
    const fork = await getFork(id);
    return basicDetails(fork);
}

// helper functions

async function getFork(id) {
    if (!db.isValidId(id)) throw 'Fork not found';
    const fork = await db.Fork.findById(id);
    if (!fork) throw 'Fork not found';
    return fork;
}

function basicDetails(fork) {
    const { title, description, producedYear, createdBy } = fork;
    return { title, description, producedYear, createdBy };
}
