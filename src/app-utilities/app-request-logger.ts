import { NextFunction, Request, Response } from "express";

const RequestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const oldSend = res.send.bind(res);

  res.send = (body: any) => {
    const duration = Date.now() - start;

    const log = {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      method: req.method,
      endpoint: req.originalUrl,
      query: req.query,
      requestBody: req.body,
      responseStatus: res.statusCode,
      duration: `${duration} ms`,
      userId: req.user?.id,
    };

    console.log(JSON.stringify(log, null, 2));

    return oldSend(body);
  };

  next();
};

export default RequestLogger;
