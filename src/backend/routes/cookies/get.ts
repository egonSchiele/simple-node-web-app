import { Request, Response } from "express";

export const get = (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log({ cookies });
  res.send("Cookies: " + JSON.stringify(cookies));
};
