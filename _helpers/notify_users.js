module.exports = {notifyUsers};

const models = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const delay = ms => new Promise(res => setTimeout(res, ms));

async function notifyUsers() {
    const theInterval = 5 * 1000;
    //wait 5 sec for migrations...
    await delay(theInterval);
    //run check...
    setInterval(function() {
      console.log("I am doing my 5 sec check");
      notify();
    }, theInterval);   
}

async function notify() {
    //get notification from sequelize...
    const notifications = await models.Notification.findAll(
        {where: {notified: {[Op.ne]: null}}}
    );
    if (notifications && notifications.length > 0) {
        for (const notification of notifications) {
            const result = await sendEmail(notification);
            if (result) {
                await notification.destroy();
            }   
        }
    }
}

async function sendEmail(notification) {
    console.log('notify users...');
    console.log(notification);
    return true;
}