import { FirebaseAuthErrorCode } from "./types.js";
import { MoodValue } from "@/common/types.js";

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

export function getMoodEmoji(mood: MoodValue): string {
  switch (mood) {
    case "good":
      return "😊";
    case "ok":
      return "😐";
    case "bad":
      return "😞";
  }
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
