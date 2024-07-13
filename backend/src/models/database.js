const { fb_app } = require("./config")
const { getDatabase, ref, set, get, child, onValue } = require("firebase/database");

const db = getDatabase(fb_app);

module.exports = { db, ref, get, set, child, onValue };