import { serialize } from "cookie";
import { Request, Response } from "express";

export const get = (req: Request, res: Response) => {
  res.setHeader("Set-Cookie", serialize("token", "", { maxAge: 0 }));
  res.redirect("/signin");
};
