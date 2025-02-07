import { serialize } from "cookie";
import { Request, Response } from "express";

export const get = (req: Request, res: Response) => {
  res.setHeader("Set-Cookie", serialize("name", "value"));
  res.send("Cookie set");
};
