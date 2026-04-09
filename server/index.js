import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import process from "process";
const { connect, connection } = mongoose;

import { countDocuments, insertMany, find, findById } from "./models/Store.js";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connect(process.env.MONGO_URI || "mongodb://localhost:27017/storedb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const count = await countDocuments();
    if (count === 0) {
      const samples = [
        {
          name: "Coffee Corner",
          address: "12 Main St",
          rating: 4.2,
          ratings: [
            { user: "alice", rating: 4 },
            { user: "bob", rating: 4.4 },
          ],
        },
        {
          name: "Book Nook",
          address: "45 Elm Ave",
          rating: 4.7,
          ratings: [
            { user: "carol", rating: 5 },
            { user: "dave", rating: 4.4 },
          ],
        },
        {
          name: "Green Grocers",
          address: "8 Market Rd",
          rating: 3.9,
          ratings: [{ user: "ellen", rating: 3.9 }],
        },
      ];
      await insertMany(samples);
    }

    const app = express();
    app.use(cors());
    app.use(json());

    app.get("/", (req, res) => res.send("API is running"));
    app.get("/api/health", (req, res) => res.json({ ok: true, db: connection.readyState === 1 }));

    app.get("/api/stores", async (req, res) => {
      try {
        const stores = await find().lean();
        res.json(stores);
      } catch {
        res.status(500).json({ error: "Failed to fetch stores" });
      }
    });

    app.get("/api/stores/:id", async (req, res) => {
      try {
        const store = await findById(req.params.id).lean();
        if (!store) return res.status(404).json({ error: "Store not found" });
        res.json(store);
      } catch {
        res.status(500).json({ error: "Error fetching store" });
      }
    });

    app.post("/api/stores/:id/rate", async (req, res) => {
      try {
        const { rating, user } = req.body;
        const n = Number(rating);
        if (!user) return res.status(400).json({ error: "User is required" });
        if (!n || n < 1 || n > 5) return res.status(400).json({ error: "Rating must be 1–5" });

        const store = await findById(req.params.id);
        if (!store) return res.status(404).json({ error: "Store not found" });

        const existing = store.ratings.find((r) => r.user === user);
        if (existing) existing.rating = n;
        else store.ratings.push({ user, rating: n });

        store.rating = Math.round((store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length) * 10) / 10;

        await store.save();
        res.json({ ok: true, store });
      } catch {
        res.status(500).json({ error: "Failed to submit rating" });
      }
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

start();