import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import connectDB from "./db/connectDB.mjs";
import xss from "xss-clean";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import path from "path";

// middleware
import authMiddleware from "./middleware/auth.middleware.mjs";

// Routes
import authRouter from "./routes/authRouter.mjs";
import jobsRouter from "./routes/jobsRouter.mjs";

// error handler
import notFoundMiddleware from "./middleware/notFound.middleware.mjs";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware.mjs";
dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});
const app = express();
// console.log(path.resolve(path.dirname("."), "client", "build"));
app.use(express.static(path.resolve(path.dirname("."), "client", "build")));
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(path.dirname("."), "client", "build", "index.html")
  );
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("database connected...");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
