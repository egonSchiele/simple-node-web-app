import { FirebaseAuthErrorCode } from "./types.js";

export function prettyFirebaseAuthError(code: FirebaseAuthErrorCode): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email already in use";
    case "auth/weak-password":
      return "Weak password";
    case "auth/invalid-email":
      return "Invalid email";
    default:
      return "An error occurred";
  }
}
