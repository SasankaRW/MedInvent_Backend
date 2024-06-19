const { Config } = require("./config");

const { PORT } = Config.APPLICATION;

const app = require("./src");

require("./cronJobs/presMedicineCron");
require("./cronJobs/dailyMedicationCron");

const onListeningLog = `
   server is running on port : ${PORT} !!!`;

const onListening = () => console.log(onListeningLog);

app.listen(PORT, "0.0.0.0", onListening());

module.exports = app;
