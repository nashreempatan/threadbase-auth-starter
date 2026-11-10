
import "dotenv/config";
import express from "express";
import cors from "cors";

import threadsRouter from "./routes/threads.js";
import authRouter from "./routes/auth.js";
import meRouter from "./routes/me.js";

import prisma from "./prisma/client.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/api/threads", threadsRouter);
app.use("/api/me", meRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: {
      code: "INTERNAL",
      message: "Something went wrong",
    },
  });
});

const PORT = 3001;

// Start server
async function start() {
  console.log("Starting Threadbase API...");

  await prisma.$connect();
  console.log("Prisma connected successfully");

  app.listen(PORT, () => {
    console.log(`Threadbase API running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:");
  console.error(err);
  process.exit(1);
});
