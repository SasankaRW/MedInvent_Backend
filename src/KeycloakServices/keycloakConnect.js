const { credentials } = require('@grpc/grpc-js');
const Keycloak = require('keycloak-connect')

const config = {
  'realm': process.env.KEYCLOAK_REALM,
  'auth-server-url': process.env.KEYCLOAK_URL,
  'ssl-required': 'external',
  resource: process.env.KEYCLOAK_CLIENT,
  'credentials':{
    'secret':process.env.KEYCLOAK_CLIENT_SECRET
  },
  'bearer-only': true,
  'public-client': true
}

const keycloak = new Keycloak({}, config);



module.exports = keycloak;

