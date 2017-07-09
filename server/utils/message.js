const moment = require('moment');
var date = moment();

var generateMessage = (from,text)=>{
  return {from,text,createdAt:date.format('LT')};
}

var generateLocationMessage = (from,latitude,longitude)=>{
  return {
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt:date.format('LT')
  }
};

module.exports = {generateMessage,generateLocationMessage};
