import { Request, Response, NextFunction } from "express";
import { verifyIdToken } from "@/backend/lib/firebase.js";

export const getUser = async (token: string | undefined) => {
  if (!token) {
    return null;
  }
  const decodeResult = await verifyIdToken(token);
  if (!decodeResult.success) {
    return null;
  }
  return decodeResult.value;
};

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await getUser(req.cookies.token);
  if (!user) {
    res.status(401).redirect(`/signin?redirect=${req.originalUrl}`);
    return;
  }
  res.locals.user = user;
  next();
};
