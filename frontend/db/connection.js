const mongoose = require("mongoose");

module.exports = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGODB_URI);
  mongoose.connection.on("open", () => {
    console.log("[DB] Connected successfully.");
  });
  mongoose.connection.on("error", (err) => {
    console.log(`[DB] ERROR: ${err}`);
  });
};
