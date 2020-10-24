const models = require('../models');

module.exports = {
    getAll,
    getById
};

async function getAll() {
    const forks = await models.Fork.findAll();
    return forks.map(x => basicDetails(x));
}

async function getById(id) {
    const fork = await getFork(id);
    return basicDetails(fork);
}

// helper functions

async function getFork(id) {
    const fork = models.Fork.findOne({where: {id: id}});
    if (!fork) throw 'Fork not found';
    return fork;
}

function basicDetails(fork) {
    const { title, description, producedYear, createdBy } = fork;
    return { title, description, producedYear, createdBy };
}
