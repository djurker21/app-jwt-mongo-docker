const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const models = require('../models');

module.exports = {
    authenticate,
    refreshToken,
    revokeToken,
    getAll,
    getById,
    getRefreshTokens,
    createUser
};

async function authenticate({ username, password, ipAddress }) {
    const user = await models.User.findOne({where: { username: username }});

    const userObj = user.dataValues;

    if (!user || !bcrypt.compareSync(password, userObj.passwordHash)) {
        throw 'Username or password is incorrect';
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(userObj.id);
    const refreshToken = generateRefreshToken(userObj.id, ipAddress);

    // save refresh token
    await refreshToken.save();

    // return basic details and tokens
    return { 
        ...basicDetails(userObj),
        jwtToken,
        refreshToken: refreshToken.token
    };
}

async function refreshToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);

    const userId = refreshToken.userId;

    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(userId, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();

    // generate new jwt
    const jwtToken = generateJwtToken(userId);

    const user = await getUser(userId);

    // return basic details and tokens
    return { 
        ...basicDetails(user),
        jwtToken,
        refreshToken: newRefreshToken.token
    };
}

async function revokeToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
}

async function getAll() {
    const users = await models.User.findAll();
    return users.map(x => basicDetails(x));
}

async function getById(id) {
    const user = await getUser(id);
    return basicDetails(user);
}

async function getRefreshTokens(userId) {
    // check that user exists
    await getUser(userId);

    // return refresh tokens for user
    return await models.RefreshToken.findAll({where: {userId: userId}});
}

async function createUser(body) {
    const passwordHash = bcrypt.hashSync(body.password, 10);
    delete body.password;
    await models.User.create({passwordHash, ...body});
}

// helper functions

async function getUser(id) {
    const user = models.User.findOne({where: {id: id}});
    if (!user) throw 'User not found';
    return user;
}

async function getRefreshToken(token) {
    const refreshToken = await models.RefreshToken.findOne({where: {token: token}});

    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
    return refreshToken;
}

function generateJwtToken(userId) {
    // create a jwt token containing the user id that expires in 15 minutes
    return jwt.sign({ sub: userId, id: userId }, config.secret, { expiresIn: '15m' });
}

function generateRefreshToken(userId, ipAddress) {
    // create a refresh token that expires in 7 days
    return models.RefreshToken.build({
      userId: userId,
      token: randomTokenString(),
      expires: new Date(Date.now() + 7*24*60*60*1000),
      createdByIp: ipAddress
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

function basicDetails(user) {
    const { id, firstName, lastName, username, email, role } = user;
    return { id, firstName, lastName, username, email, role };
}
