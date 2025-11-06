const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

function logToFile(message) {
  const logFile = path.join(logDir, "api.log");
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
  console.log(message);
}

function logError(message) {
  const errorFile = path.join(logDir, "error.log");
  const timestamp = new Date().toISOString();
  fs.appendFileSync(errorFile, `[${timestamp}] ERROR: ${message}\n`);
  console.error(message);
}

module.exports = { logToFile, logError };
