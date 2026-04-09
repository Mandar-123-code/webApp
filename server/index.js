import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
const { connect, connection } = mongoose;
import { MongoMemoryServer } from "mongodb-memory-server";
import { countDocuments, insertMany, find, findById } from "./models/Store.js";

const PORT = 5000;

async function start() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  console.log("Starting in-memory MongoDB...");
  await connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Mongoose connected to", uri);
  const count = await countDocuments();
  if (count === 0) {
    console.log("Seeding sample stores...");
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
    console.log("Seed complete");
  }

  const app = express();
  app.use(cors());
  app.use(json());

  app.get("/api/health", (req, res) =>
    res.json({ ok: true, db: connection.readyState === 1 }),
  );

  app.get("/api/stores", async (req, res) => {
    const stores = await find().lean();
    res.json(stores);
  });

  app.get("/api/stores/:id", async (req, res) => {
    const s = await findById(req.params.id).lean();
    if (!s) return res.status(404).json({ error: "Not found" });
    res.json(s);
  });

  app.post("/api/stores/:id/rate", async (req, res) => {
    const { rating, user } = req.body;
    const n = Number(rating);
    if (!n || n < 1 || n > 5)
      return res.status(400).json({ error: "Invalid rating" });

    const store = await findById(req.params.id);
    if (!store) return res.status(404).json({ error: "Store not found" });

    const existing = store.ratings.find((r) => r.user === user);
    if (existing) existing.rating = n;
    else store.ratings.push({ user: user || "anonymous", rating: n });

    const avg =
      store.ratings.reduce((s, r) => s + r.rating, 0) / store.ratings.length;
    store.rating = Math.round(avg * 10) / 10;

    await store.save();
    res.json({ ok: true, store });
  });

  app.listen(PORT, () => {
    console.log("API server listening on port", PORT);
    console.log("Health: GET http://localhost:" + PORT + "/api/health");
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
});
