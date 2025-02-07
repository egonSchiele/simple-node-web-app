import { serialize } from "cookie";
import { Request, Response } from "express";
import { isLoggedIn } from "../lib/middleware/auth.js";

export const get = [
  isLoggedIn,
  (req: Request, res: Response) => {
    res.json({ message: "This is a secured route", user: res.locals.user });
  },
];
