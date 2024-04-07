import express, { Express, Request, Response } from "express";
import googleRouter from "./routes/googleRoutes.js";

const app: Express = express();
const PORT: number = 3001;

app.listen(PORT, () => {
  console.log("Server is running at port: ", PORT);
});

app.use("/google", googleRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});
