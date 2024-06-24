const axios = require('axios')
const jwt = require('jsonwebtoken')
const keyCloakAdminClient = require('./keyCloakAdminClient')
// const APIerror = require('../../utils/APIerror')

module.exports = class KeyCloakService{
     // Static variables
  static keycloak
  static kcBase //URL
  static kcRealm
  static kcClient //ID
  
  constructor () {
    keyCloakAdminClient().then((keycloak) => {
      this.keycloak = keycloak
    }).catch((error) => {
      console.log('Failed to login keycloak:', error.message)
    })

    // get environment variables
    this.kcBase = process.env.KEYCLOAK_URL
    this.kcRealm = process.env.KEYCLOAK_REALM
    this.kcClient = process.env.KEYCLOAK_CLIENT
  }

    // create a user
    async createUser (email, contactNo, roles) {
        try {
          // create user and return their UUID
          const user = await this.keycloak.users.create({
            // username,
            email,
            emailVerified: false,
            enabled: true,
            groups: roles,
            credentials: [{ type: 'password', temporary: true, value: 'password' }],
            requiredActions: ['VERIFY_EMAIL', 'UPDATE_PASSWORD']
          })
    
          // send verify email
          // await this.keycloak.users.sendVerifyEmail({
          //   id: user.id
          // })
    
          await this.keycloak.users.executeActionsEmail({
            id: user.id,
            actions: ['VERIFY_EMAIL', 'UPDATE_PASSWORD']
          })
    
          // return user ID
          return user.id
        } catch (error) {
          // catch keycloak endpoint errors
          if (error.response?.status === 400) {
            throw new APIerror(error.response?.status, error.message, 'Invalid User Information')
          }
          if (error.response?.status === 409) {
            throw new APIerror(error.response?.status, error.message, 'User already exists')
          }
    
          throw new APIerror(error.response?.status, error.message, 'Failed to create user')
        }
      }

        // admin update a user
  async updateUser (id, email, roles, status) {
    try {
      // find the user
      const user = await this.keycloak.users.findOne({
        id
      })

      if (!user) {
        throw new APIerror(404, 'Keycloak updateUser : user not found', 'User not found')
      }

      // get all groups in realm
      const groups = await this.keycloak.groups.find()

      // delete all groups from user
      await groups.forEach(async (group) => {
        await this.keycloak.users.delFromGroup({
          id,
          groupId: group.id
        })
      })

      // filter out the group to add
      const newGroup = groups.find(item => (item.name === roles[0]))

      if (!newGroup) {
        throw new APIerror(400, 'Keycloak updateUser : group requested not available', 'Failed to update user')
      }

      // add user to group
      await this.keycloak.users.addToGroup({
        id,
        groupId: newGroup.id
      })

      // true if email changed
      const isEmailChanged = (user.email !== email)

      // updated user object
      const updatedUser = {
        email,
        emailVerified: !isEmailChanged, // false if email changed
        enabled: (status === 'active' || isEmailChanged), // user should be enabled to send verify email
        requiredActions: (isEmailChanged) ? ['VERIFY_EMAIL'] : []
      }

      // update user other details
      await this.keycloak.users.update({
        id
      }, updatedUser)

      // send verify email if email changed
      if (isEmailChanged) {
        await this.keycloak.users.sendVerifyEmail({
          id
        })
      }
    } catch (error) {
      // handle keycloak endpoint errors
      if (error.response) {
        if (error.response.status === 404) {
          throw new APIerror(error.response.status, error.message, 'User not found')
        }

        throw new APIerror(error.response.status, error.message, 'Failed to update user')
      }

      // handle other API errors
      throw new APIerror(error.statusCode, error.message, error.customMessage)
    }
  }

  // send password reset email to user
  async selfResetPassword (userId) {
    console.log('CALLED')
    try {
      await this.keycloak.users.executeActionsEmail({
        id: userId,
        actions: ['UPDATE_PASSWORD']
      })

      return true
    } catch (error) {
      console.log(error.toJSON())
      throw new APIerror(400, 'Keycloak Admin API: executeActionsEmail failed', 'Failed to send reset password email')
    }
  }

  // return access token and user ID for user login
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
      // keycloak return error if email is not verified
      if (error.response.data.error_description === 'Account is not fully set up') {
        throw new APIerror(error.response?.status, error.message, 'Please verify email')
      }

      throw new APIerror(error.response?.status, error.message, 'Invalid user credentials')
    }
  }

  // user self update email on keycloak
  async selfUpdateUser (userId, email, accessToken) {
    try {
      // find the user
      const user = await this.keycloak.users.findOne({
        id: userId
      })

      if (!user) {
        throw new APIerror(404, 'Keycloak updateUser : user not found', 'User not found')
      }

      // return if no email change
      if (user.email === email) {
        return
      }

      console.log(email)

      // update email using users accessToken
      const response = await axios.post(`${this.kcBase}/realms/${this.kcRealm}/account/`, {
        email
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (response.status !== 204) {
        throw new APIerror(400, 'keycloak update email: response is not 204', 'Failed to update user')
      }

      // send verify email
      await this.keycloak.users.sendVerifyEmail({
        id: userId
      })
    } catch (error) {
      // handle keycloak endpoint errors
      if (error.response) {
        throw new APIerror(error.response.status, error.message, 'Failed to update user')
      }

      // handle other API errors
      throw new APIerror(error.statusCode, error.message, error.customMessage)
    }
  }
}