const { fb_app } = require("./config")
const { getDatabase, ref, set, get, child, onValue, update, remove } = require("firebase/database");

const db = getDatabase(fb_app);

module.exports = { db, ref, get, set, child, onValue, update, remove };