const express = require("express");

const app = express();

const cors = require("cors");

const bodyParser = require("body-parser");

const { accessHeader } = require("./init");

const { generateTables } = require("./scripts/middleware");

app.use(cors());

//KeyCloak
const KeyCloakService = require('./KeycloakServices/keyCloakService');
const AuthProvider = new KeyCloakService();

// KeyCloak-connect 
const keycloak = require('./KeycloakServices/keycloakConnect');
app.use(keycloak.middleware())

const cookieParser = require("cookie-parser");

const router = require("./router");

const { Config } = require("../config");

const { DEFINITION, APIS } = Config.SWAGGER;

const { JSON_PARSER, URLENCODED } = Config.BODYPARSER;

app.use(bodyParser.json(JSON_PARSER));

app.use(bodyParser.urlencoded(URLENCODED));

app.use(cookieParser());

app.use(accessHeader);

app.use("/api", router);

generateTables();

module.exports = app;
