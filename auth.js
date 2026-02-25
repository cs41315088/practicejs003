import { auth } from "./firebase-init.js";
import {
  GoogleAuthProvider,
  // signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

export function loginWithGoogle() {
  return signInWithPopup(auth, provider);
  // TODO リダイレクトだとドメインの関係でうまく動かない？
  // return signInWithRedirect(auth, provider);
}

export function logout() {
  return signOut(auth);
}

export async function handleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log("Redirect login success:", result.user);
    }
  } catch (e) {
    console.error("Redirect login error:", e);
  }
}
