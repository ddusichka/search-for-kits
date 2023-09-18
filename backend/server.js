const express = require("express");
const cors = require("cors");
const kitRoutes = require("./kitRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/kits", kitRoutes);
app.listen(4000, () => {
  console.log("listening on port 4000...");
});
