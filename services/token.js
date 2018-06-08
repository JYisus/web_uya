'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
function createToken(user){
  const payload ={
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return jwt.encode(payload, config.SECRET_TOKEN)
}

module.exports = createToken;
