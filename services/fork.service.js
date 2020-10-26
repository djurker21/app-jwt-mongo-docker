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
    const result = await models.Fork.create(body);
    await notifyUser(result.CategoryId, result.userId, result.id);
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
    const fork = await models.Fork.findOne({where: {id: id}});
    if (!fork) throw 'Fork not found';
    return fork;
}

async function notifyUser(categoryId, userId, forkId) {
    const usersSubscribed = await models.UserSubsribeCategory.findAll({where: {categoryId}});
    if (usersSubscribed) {
        for (const userSubscribed of usersSubscribed) {
            const userToNotify = userSubscribed.userId;
            await models.Notification.create({categoryId, userId, forkId, userToNotify});
        }
    }
}