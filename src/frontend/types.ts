export type BannerLevel = "info" | "error";
export type Banner = {
  level: BannerLevel;
  message: string;
};

export type FirebaseAuthErrorCode =
  | "auth/email-already-in-use"
  | "auth/weak-password"
  | "auth/invalid-email";
