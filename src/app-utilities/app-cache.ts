import { RedisCache } from "../services/redis-cache";

const cache = RedisCache.getInstance();
export const initCache = async () => {
  await cache.connect();
};

export default cache;
