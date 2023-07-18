const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./DB");
dotenv.config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 6000;

const products_routes = require("./routes/productR");
const users_routes = require("./routes/UserR");
const auth_routes = require("./routes/AuthR");
//accessing req.body and req.cookies
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//middlewares for routing
app.use("/api/products", products_routes);
app.use("/api/users", users_routes);
app.use("/api/auth", auth_routes);

//ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "something went wrong",
    },
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on ${PORT} `);
});
