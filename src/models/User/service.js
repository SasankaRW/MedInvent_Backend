const { default: axios } = require("axios");
const Database = require("../User/database");
const { TE } = require("../../helper");
const jwt = require("jsonwebtoken");

const createUser = async (data, credentials, providedAccessToken) => {
  let accessToken = providedAccessToken;

  if (!accessToken) {
    const requestBody = {
      client_id: process.env.KEYCLOAK_CLIENT,
      username: process.env.KEYCLOAK_ADMIN_USERNAME,
      password: process.env.KEYCLOAK_ADMIN_PASSWORD,
      grant_type: "password",
      scope: "openid",
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
    };

    try {
      const tokenResponse = await axios.post(
        `${process.env.KEYCLOAK_URL}/realms/gl-medinvent/protocol/openid-connect/token`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      accessToken = tokenResponse.data.access_token;
    } catch (error) {
      TE("Failed to obtain access token");
    }
  }

  try {
    const createUserResponse = await axios.post(
      `${process.env.KEYCLOAK_URL}/admin/realms/gl-medinvent/users`,
      {
        username: credentials.email,
        email: credentials.email,
        emailVerified: true,
        enabled: true,
        groups: [credentials.role],
        credentials: [
          { type: "password", temporary: false, value: credentials.password },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (createUserResponse.status !== 201) {
      TE("Failed to create user: response status is not 201");
    }

    const keyCloakUser = await axios.get(
      `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users?username=${credentials.email}&exact=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (keyCloakUser.data.length === 0) {
      TE("Failed to create user: new user not found");
    }

    const userId = keyCloakUser.data[0].id;
    const user = await Database.createUser(data, credentials, userId);

    return user;
  } catch (error) {
    if (error.response?.status === 409) {
      TE("User already exists");
    }
    console.log(error);
    TE("Failed to create user");
  }
};

const logInUser = async (email, password) => {
  const requestBody = new URLSearchParams({
    client_id: process.env.KEYCLOAK_CLIENT,
    username: email,
    password: password,
    grant_type: "password",
    scope: "openid",
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
  });

  try {
    const response = await axios.post(
      `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = response.data.access_token;

    const decodedToken = jwt.decode(accessToken);

    const userID = decodedToken.sub;
    const roles = decodedToken.resource_access.medinvent.roles;

    const user = await Database.getUserByRoleAndId(userID, roles);

    return { accessToken, user, roles };
  } catch (error) {
    if (error.response?.status === 401) {
      const err = new Error("Invalid user credentials");
      err.httpCode = 401;
      throw err;
    }

    const err = new Error("Error logging in");
    err.httpCode = error.response?.status || 500;
    throw err;
  }
};

module.exports = {
  createUser,
  logInUser,
};
