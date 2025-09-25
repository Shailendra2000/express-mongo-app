import mongoose from "mongoose";
import { appConfig } from "../app-utilities/app-config";

class Database {
  private static instance: typeof mongoose | null = null;

  public static async connect(): Promise<typeof mongoose> {
    if (this.instance) {
      return this.instance;
    }

    try {
      this.instance = await mongoose.connect(appConfig.MONGO_URI, {
        maxPoolSize: 50,
        minPoolSize: 5,
      });

      console.log("Connected to database...");
      return this.instance;
    } catch (error) {
      console.error("Database connection error:", error);
      process.exit(1);
    }
  }
}
export default Database;
