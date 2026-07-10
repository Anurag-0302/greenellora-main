import mongoose from "mongoose";
import dotenv from "dotenv";
import HandicraftProduct from "../src/models/HandicraftProduct";
import AyurvedicProduct from "../src/models/AyurvedicProduct";
import Video from "../src/models/Video";
import { handicraftProducts } from "../src/lib/handicrafts";
import { ayurvedicProducts } from "../src/lib/ayurvedic";
import { videos } from "../src/lib/videos";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/greenellora";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    console.log("Clearing existing data...");
    await HandicraftProduct.deleteMany({});
    await AyurvedicProduct.deleteMany({});
    await Video.deleteMany({});

    // Seed handicraft products
    console.log("Seeding handicraft products...");
    const handicraftSeedProducts = await handicraftProducts();
    for (const product of handicraftSeedProducts) {
      await HandicraftProduct.create(product);
    }
    console.log(`Seeded ${handicraftSeedProducts.length} handicraft products`);

    // Seed ayurvedic products
    console.log("Seeding ayurvedic products...");
    const ayurvedicSeedProducts = await ayurvedicProducts();
    for (const product of ayurvedicSeedProducts) {
      await AyurvedicProduct.create(product);
    }
    console.log(`Seeded ${ayurvedicSeedProducts.length} ayurvedic products`);

    // Seed videos
    console.log("Seeding videos...");
    const videoSeedItems = await videos();
    for (const video of videoSeedItems) {
      await Video.create(video);
    }
    console.log(`Seeded ${videoSeedItems.length} videos`);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seed();
