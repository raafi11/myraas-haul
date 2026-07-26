import "dotenv/config";
import cors from "cors";
import express from "express";
import favoritesRoutes from "./routes/favorites.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174",
    ],
  }),
);

app.use(express.json({ limit: "25mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    aiReady: false,
    provider: "mock",
    model: "placeholder",
  });
});

app.post("/api/try-on", async (req, res) => {
  try {
    const { humanImage, garmentImage } = req.body ?? {};

    if (!humanImage || !garmentImage) {
      return res.status(400).json({
        error: "Missing person photo or outfit photo.",
      });
    }

    console.log("Mock try-on requested");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    res.json({
      imageUrl: garmentImage,
      provider: "mock",
      success: true,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Mock try-on failed.",
    });
  }
});

app.use("/api/favorites", favoritesRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});