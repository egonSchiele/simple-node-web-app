import { serialize } from "cookie";
import { Request, Response } from "express";
import { isLoggedIn } from "../lib/middleware/auth.js";
import { success } from "@/common/types.js";

export const get = [
  isLoggedIn,
  (req: Request, res: Response) => {
    return success({
      message: "This is a secured route",
      user: res.locals.user,
    });
  },
];
