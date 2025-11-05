import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

// This script's only job is to guard the page.

// Hide the documentElement immediately to prevent any content from flashing.
document.documentElement.style.visibility = 'hidden';

onAuthStateChanged(auth, (user) => {
  if (user) {
    // If the user is authenticated, make the page visible.
    document.documentElement.style.visibility = 'visible';
  } else {
    // If the user is not authenticated, redirect to the login page.
    window.location.replace("login.html");
  }
});
