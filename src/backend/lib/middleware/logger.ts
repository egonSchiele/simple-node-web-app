import { NextFunction, Request, Response } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - start;
    console.log(
      `${req.method} ${req.url} -> ${res.statusCode} ${responseTime}ms`
    );
  });

  next();
};

export default loggerMiddleware;
