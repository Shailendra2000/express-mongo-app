import { NextFunction, Request, Response } from "express";
import cache from "./app-cache";

const redisClient = cache.getClient();

interface RateLimiterRule {
  endpoint: string;
  rate_limit: {
    time: number;
    limit: number;
  };
}

export const rateLimiter = (rule: RateLimiterRule) => {
  const { endpoint, rate_limit } = rule;

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const ipAddress = request.ip;
      const redisId = `${endpoint}/${ipAddress}`;

      let requestCount = await redisClient.incr(redisId);

      if (requestCount === 1) {
        await redisClient.expire(redisId, rate_limit.time);
      }

      if (requestCount > rate_limit.limit) {
        return response.status(429).send({
          message: "Too many requests",
        });
      }

      next();
    } catch (err) {
      console.error("Rate limiter error:", err);
      next(err);
    }
  };
};
