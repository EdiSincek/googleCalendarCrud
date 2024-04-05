import express from "express";
const app = express();
const PORT = 3000; //Will change it to env later
app.listen(PORT, () => {
  console.log("Server is running at port: ", PORT);
});
app.get("/", (req, res) => {
  res.send("Hello world!");
});
//# sourceMappingURL=index.js.map
