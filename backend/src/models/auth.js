const { fb_app } = require("./config")
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } = require("firebase/auth");

const auth = getAuth(fb_app);

module.exports = { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail };
