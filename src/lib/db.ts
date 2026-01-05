import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  // 1. Check if we are already connected
  if (mongoose.connection.readyState >= 1) return;

  // 2. Build-time safety: If URI is missing or we are in the build phase
  // We want to avoid connecting to the database to prevent build failures.
  const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";
  
  if (!MONGODB_URI || isBuildPhase) {
    if (isBuildPhase) {
      console.log("⏭️ Skipping MongoDB connection during build phase.");
    } else {
      console.warn("⚠️ MONGODB_URI is missing. Database features will be unavailable.");
      // In professional setups, you might throw here at runtime,
      // but let's keep it safe for the build.
    }
    return;
  }

  try {
    // 3. Runtime connection
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false, // Recommended for serverless environments
    });
    console.log("✅ MongoDB Connected successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    // Ensure we don't crash the build even if a connection attempt fails
    if (isBuildPhase) return;
    throw error;
  }
};
