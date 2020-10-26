const models = require('../models');

const {getPagination, getPagingData} = require('../_helpers/paginator');

module.exports = {
    getAll,
    getById,
    createFork,
    getByUserId,
    getByCategoryId
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

async function getByUserId(userId, query) {
    const {page, size} = query;
    const {limit, offset} = getPagination(page, size);
    const data = await models.Fork.getByUserId(userId, limit, offset);
    return getPagingData(data, page, size);
}

async function getByCategoryId(CategoryId, query) {
    const {page, size} = query;
    const {limit, offset} = getPagination(page, size);
    const data = await models.Fork.getByCategoryId(CategoryId, limit, offset);
    return getPagingData(data, page, size);
}

// helper functions

async function getFork(id) {
    const fork = models.Fork.findOne({where: {id: id}});
    if (!fork) throw 'Fork not found';
    return fork;
}