import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connect } from "./db/connection";
import configDevEnv from "../config";
import notFound from "./middleware/not-found";
import errorHandler from "./middleware/error-handler";
import { init } from "./db/initDB";

configDevEnv();

import { productRouter, productsRouter, productImageRouter, userRouter, usersRouter, loginRouter } from "./routes";

const app = express(), port = process.env.PORT,
    apiVersion = 1,
    baseUrl = `/api/v${apiVersion}`;


app.use(morgan("dev"));
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5172"] }));
// app.use(errorHandler);
app.use(express.json());
app.use(express.static("public"));


app.use(`${baseUrl}/products`, productsRouter);
app.use(`${baseUrl}/products`, productRouter);
app.use(`${baseUrl}/products/image`, productImageRouter);
app.use(`${baseUrl}/users`, usersRouter);
app.use(`${baseUrl}/users`, userRouter);
app.use(`${baseUrl}/users/login`, loginRouter);

app.use(notFound);

(async () => {
    await connect();
    await init();
})();
app.listen(port, () => { console.log(`Example app listening on port ${port}`) });
