import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Initialize Auth
const auth = getAuth(app);

// Sign in existing user
window.loginWithEmail = async function(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    showNotice(err.message, "Sign-In Error");
  }
};

// Admin creates a new user account
window.createNewUserAccount = async function(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save additional profile info in database
    await set(ref(db, `users/${user.uid}`), {
      uid: user.uid,
      email: email,
      name: name,
      role: "user",
      status: "approved",
      createdAt: Date.now()
    });

    showNotice(`Successfully created account for ${name}!`, "Success");
  } catch (err) {
    showNotice(err.message, "Creation Error");
  }
};