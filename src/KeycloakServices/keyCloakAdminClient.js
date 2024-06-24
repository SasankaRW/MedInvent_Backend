module.exports = async function keyCloakAdminClient() {
  // dynamically import the ES module
  const { default: KcAdminClient } = await import('@keycloak/keycloak-admin-client');

  // initialize KcAdminClient
  const config = {
    baseUrl: process.env.KEYCLOAK_URL,
    realmName: process.env.KEYCLOAK_REALM
  };

  const kcAdminClient = new KcAdminClient(config);

  // login via realm ADMIN account
  const auth = async () => {
    await kcAdminClient.auth({
      username: process.env.KEYCLOAK_ADMIN_USERNAME,
      password: process.env.KEYCLOAK_ADMIN_PASSWORD,
      grantType: 'password',
      clientId: process.env.KEYCLOAK_CLIENT,
      clientSecret:process.env.KEYCLOAK_CLIENT_SECRET
    });
  };

  await auth();
  console.log('Keycloak logged in');

  // re-login every 55 minutes
  setInterval(async () => {
    await auth();
    console.log('Keycloak logged in');
  }, 3300 * 1000);

  return kcAdminClient;
};
