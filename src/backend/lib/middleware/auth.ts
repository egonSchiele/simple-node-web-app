import { Request, Response, NextFunction } from "express";
import { verifyIdToken } from "@/backend/lib/firebase.js";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const decodeResult = await verifyIdToken(token);
  if (!decodeResult.success) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.locals.user = decodeResult.value;
  next();
};
