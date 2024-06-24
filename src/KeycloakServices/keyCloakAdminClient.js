const KcAdminClient = require("@keycloak/keycloak-admin-client").default;

module.exports = async function keyCloakAdminClient() {
  // initialize KcAdminClient
  const config = {
    baseUrl: process.env.KEYCLOAK_URL,
    realmName: process.env.KEYCLOAK_REALM,
  };

  const kcAdminClient = new KcAdminClient(config);
  const kcAdminClient = new KcAdminClient(config);

  // Login via realm ADMIN account
  const auth = async () => {
    await kcAdminClient.auth({
      username: process.env.KEYCLOAK_ADMIN_USERNAME,
      password: process.env.KEYCLOAK_ADMIN_PASSWORD,
      grantType: "password",
      clientId: process.env.KEYCLOAK_CLIENT,
    });
  };

  await auth();
  console.log("Keycloak logged in");

  // Re-login every 55 minutes
  setInterval(async () => {
    await auth();
    console.log("Keycloak logged in");
  }, 3300 * 1000);

  return kcAdminClient;
};
  return kcAdminClient;
};
