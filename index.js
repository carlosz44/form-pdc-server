const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// Creating Server
const app = express();

// Connecting to DB
connectDB();

const optionsCors = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(optionsCors));
app.use(cors());

// App port
const port = process.env.PORT || 4000;

// Enable reading body values
app.use(express.json());

// Public folder
app.use(express.static("uploads"));

// App routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth/reg", require("./routes/auth"));
app.use("/api/links", require("./routes/links"));
app.use("/api/uploads", require("./routes/uploads"));

// Run app
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
