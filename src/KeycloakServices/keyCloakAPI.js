const axios = require('axios')
const jwt = require('jsonwebtoken')
// const APIerror = require('../../utils/APIerror')
const KeyCloakService = require('./keyCloakService')

module.exports = class  KeyCloakAPI {
    // Static variables
    static kcBase
    static kcRealm
    static kcClient

      // initialize variables
  constructor () {
    this.kcBase = process.env.KEYCLOAK_URL
    this.kcRealm = process.env.KEYCLOAK_REALM
    this.kcClient = process.env.KEYCLOAK_CLIENT
  }

    // create a user using admin access
    async createUser (user, password, accessToken) {
      const { email, contactNo,  roles } = user
  
      try {
        // create new user in keycloak
        const response = await axios.post(`${this.kcBase}/admin/realms/${this.kcRealm}/users`, {
          username: userName,
          email,
          emailVerified: true,
          enabled: true,
          groups: roles,
          credentials: [{ type: 'password', temporary: false, value: password }]
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
  
        // if user is created response is 201
        if (response.status !== 201) {
          throw new APIerror(400, 'keycloak create user: response is not 201', 'Failed to create user')
        }
  
        // find the new user via userName
        const keyCloakUser = await axios.get(`${this.kcBase}/admin/realms/${this.kcRealm}/users?username=${email}&exact=true`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
        )
  
        // if user not found it return an empty array
        if (keyCloakUser.data.length === 0) {
          throw new APIerror(400, 'keycloak create user: new user not found', 'Failed to create user')
        }
  
        // update user object with UUID from keycloak
        user.id = keyCloakUser.data[0].id
        user.status = 'active'
      } catch (error) {
        // keycloak return 409 if user already exists
        if (error.response?.status === 409) {
          throw new APIerror(error.response?.status, error.message, 'User already exists')
        }
        throw new APIerror(error.response?.status, error.message, 'Failed to create user')
      }
  
      return user
    }

      // update existing user on keycloak
  async updateUser (id, data, accessToken) {
    try {
      // GET all groups in realm
      const realRolesResponse = await axios.get(`${this.kcBase}/admin/realms/${this.kcRealm}/groups`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // convert response into object with key-value pair of group name & UUID
      const realmRoles = realRolesResponse.data.reduce((accumulator, value) => {
        return { ...accumulator, [value.name]: value.id }
      }, {})

      // send delete request for all the group of user
      for (const role in realmRoles) {
        await axios.delete(`${this.kcBase}/admin/realms/${this.kcRealm}/users/${id}/groups/${realmRoles[role]}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
      }

      // add all new roles to the user
      for (const role of data.roles) {
        // console.log(accessToken)
        await axios.put(`${this.kcBase}/admin/realms/${this.kcRealm}/users/${id}/groups/${realmRoles[role]}`, {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
      }

      // update all other user details
      await axios.put(`${this.kcBase}/admin/realms/${this.kcRealm}/users/${id}`, {
        email: data.email,
        emailVerified: true,
        enabled: (data.status === 'active'),
        ...(data.password && { credentials: [{ type: 'password', temporary: false, value: data.password }] })
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    } catch (error) {
      throw new APIerror(error.response?.status, error.message)
    }
  }

  // return access token and user for user login
  async loginUser (email, password) {
    try {
      // get token from keycloak
      const response = await axios.post(`${this.kcBase}/realms/${this.kcRealm}/protocol/openid-connect/token`, {
        client_id: this.kcClient,
        username: email,
        password,
        grant_type: 'password',
        scope: 'openid'
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      const accessToken = response.data.access_token

      // decode token to find user UUID on payload
      const userID = jwt.decode(accessToken).sub

      return { accessToken, userID }
    } catch (error) {
      throw new APIerror(error.response?.status, error.message, 'Invalid user credentials')
    }
  }

  // user self update email on keycloak
  async selfUpdateUser (email, accessToken) {
    try {
      const response = await axios.post(`${this.kcBase}/realms/${this.kcRealm}/account/`, {
        email
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (response.status !== 204) {
        throw new APIerror(400, 'keycloak update user: response is not 204', 'Failed to update user')
      }
    } catch (error) {
      throw new APIerror(error.response?.status, error.message)
    }
  }

  // user reset password through keycloak service
  async resetPassword (id) {
    const keycloak = await KeyCloakService.init()

    // throws error if fail to send email
    await keycloak.selfResetPassword(id)

    return true
  }
}