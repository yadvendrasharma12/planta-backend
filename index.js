
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { connectDb } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import plantaRoutes from "./routes/plantsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware.js";

const app = express();

// 1. Security headers
app.disable("x-powered-by");
app.use(helmet());

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

// 4. API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use("/api", apiLimiter);

// 5. Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1/planta", plantaRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/notifications", notificationRoutes);

// 6. Error handling (keep these after routes)
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 7001;

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
