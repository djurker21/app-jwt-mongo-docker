const models = require('../models');

const {getPagination, getPagingData} = require('../_helpers/paginator');

module.exports = {
    getAll,
    getById,
    createFork
};

async function getAll(query) {
    const {page, size} = query;
    const {limit, offset} = getPagination(page, size);
    const data = await models.Fork.findAndCountAll({limit, offset});
    return getPagingData(data, page, size);
}

async function getById(id) {
    return await getFork(id);
}

async function createFork(body) {
    await models.Fork.create(body);
}

// helper functions

async function getFork(id) {
    const fork = models.Fork.findOne({where: {id: id}});
    if (!fork) throw 'Fork not found';
    return fork;
}