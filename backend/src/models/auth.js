const { fb_app } = require("./config")
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendPasswordResetEmail, EmailAuthProvider, reauthenticateWithCredential, updatePassword } = require("firebase/auth");

const auth = getAuth(fb_app);

module.exports = { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendPasswordResetEmail, EmailAuthProvider, reauthenticateWithCredential, updatePassword };
