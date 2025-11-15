const express = require("express");
const cors = require("cors");
const propertyRoutes = require("./routes/property.routes");
require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/properties", propertyRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
