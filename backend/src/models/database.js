const { fb_app } = require("./config")
const { getDatabase, ref, get, child } = require("firebase/database");

const db = getDatabase(fb_app);
const dbRef = ref(db);
module.exports = { db, dbRef, get, child };