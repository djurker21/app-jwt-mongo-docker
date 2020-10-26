const models = require('../models');

const {getPagination, getPagingData} = require('../_helpers/paginator');

module.exports = {
    getAll,
    createCategory,
    getByIdIncludeForks,
    subscribeUser
};

async function getAll(query) {
    const {page, size} = query;
    const {limit, offset} = getPagination(page, size);
    const data = await models.Category.findAndCountAll({limit, offset});
    return getPagingData(data, page, size);
}

async function createCategory(body) {
    await models.Category.create(body);
}

async function getByIdIncludeForks(id) {
    await models.Category.getByIdIncludeForks(id);
}

async function subscribeUser(userId, categoryId) {
    await models.UserSubsribeCategory.create({userId, categoryId});
}