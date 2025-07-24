import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import docs from "../src/routes/docs.js"; // Make sure this path is correct

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://nep-dash.vercel.app",
];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use("/api", docs);

// MongoDB Connection
let isConnected = false;

const connectToMongo = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw err;
  }
};

// Export Vercel-compatible handler
const handler = async (req, res) => {
  try {
    await connectToMongo();
    return app(req, res);
  } catch (err) {
    console.error("Handler error:", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};

export default handler;
