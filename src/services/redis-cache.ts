import Redis from "ioredis";
import { appConfig } from "../app-utilities/app-config";

export class RedisCache {
  private client: Redis;
  private static instance: RedisCache;
  constructor() {
    this.client = new Redis({
      host: appConfig.REDIS_HOST,
      port: Number(appConfig.REDIS_PORT),
      password: appConfig.REDIS_PASSWORD,
    });

    this.client.on("error", (err) => {
      console.error("Redis error:", err);
    });

    this.client.on("connect", () => {
      console.log("Connecting to Redis store");
    });
  }

  public static getInstance(): RedisCache {
    if (!RedisCache.instance) {
      RedisCache.instance = new RedisCache();
    }
    return RedisCache.instance;
  }

  async connect() {
    try {
      await this.client.connect();
    } catch (e) {
      console.error("Error connecting to Redis:", e);
      process.exit(1);
    }
  }

  getClient() {
    return this.client;
  }
}
