import { serialize } from "cookie";
import { Request, Response } from "express";
import { verifyIdToken } from "@/backend/lib/firebase.js";

export const post = async (req: Request, res: Response) => {
  const decodeResult = await verifyIdToken(req.headers.authorization || "");
  if (decodeResult.success) {
    res.setHeader(
      "Set-Cookie",
      serialize("token", req.headers.authorization || "")
    );
  }
  res.json({ result: decodeResult.success });
};
