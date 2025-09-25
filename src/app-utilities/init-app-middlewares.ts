import { Express, json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import RequestLogger from "./app-request-logger";
import { rateLimiter } from "./rate-limiter";

const initAppMiddlewares = (app: Express) => {
  console.log("initializing app middlewares...");
  app.use(cors());
  app.use(helmet());
  app.use(
    rateLimiter({ rate_limit: { time: 60, limit: 120 }, endpoint: "all" })
  );
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(RequestLogger);
};

export default initAppMiddlewares;
