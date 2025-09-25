/// <reference path="./types.d.ts" />
import express from "express";
import { appConfig } from "./app-utilities/app-config";

import initAppMiddlewares from "./app-utilities/init-app-middlewares";
import registerAppRoutes from "./app-utilities/register-app-routes";
import notFoundHandler from "./app-utilities/404-handler";
import globalErrorHandler from "./app-utilities/global-error-handler";
import Database from "./database/database";

const app = express();

initAppMiddlewares(app);
registerAppRoutes(app);

app.use(notFoundHandler);
app.use(globalErrorHandler);

Database.connect().then(async () => {
  app.listen(appConfig.PORT, () => {
    console.log(`Server ${process.pid} started on port ${appConfig.PORT}`);
  });
});
