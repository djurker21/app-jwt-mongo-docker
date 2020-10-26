module.exports = {notifyUsers};

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

function notify() {
    //get notification from sequelize...
    console.log('notify users...');
}