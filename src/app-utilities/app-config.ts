function validateEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const appConfig = {
  PORT: validateEnv("PORT"),
  MONGO_URI: validateEnv("MONGO_URI"),
  REDIS_PORT: validateEnv("REDIS_PORT"),
  REDIS_HOST: validateEnv("REDIS_HOST"),
  REDIS_PASSWORD: validateEnv("REDIS_PASSWORD"),
  RATE_LIMIT_PER_MINUTE: validateEnv("RATE_LIMIT_PER_MINUTE"),
  JWT_SECRET: validateEnv("JWT_SECRET"),
};
