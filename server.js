// Express api server on port env.PORT
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const slowdown = require("express-slow-down");
const ratelimit = require("express-rate-limit");

const port = process.env.PORT || 80;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  slowdown({
    windowMs: 1000, // 1 second
    delayAfter: 10, // begin slowing down responses after the 10th request
    delayMs: 500, // slow down subsequent responses by 500ms
  })
);
app.use(
  ratelimit({
    windowMs: 1000, // 1 second
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Routes

app.get("/", (req, res) => {
  res.send("MinosAPI is running!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
