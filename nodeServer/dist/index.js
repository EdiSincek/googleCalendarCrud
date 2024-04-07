import express from "express";
import googleRouter from "./routes/googleRoutes.js";
const app = express();
const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server is running at port: ", PORT);
});
app.use("/google", googleRouter);
app.get("/", (req, res) => {
    res.send("Hello world!");
});
