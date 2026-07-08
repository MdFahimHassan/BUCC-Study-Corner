import mongoose from 'mongoose';
import { isMemoryStoreEnabled } from './storage.js';

// Cache the Mongoose connection across serverless invocations.
// Without this, every cold start on Vercel would open a fresh connection
// (and MongoDB Atlas would eventually refuse / rate-limit us).
const cached = global._mongooseConnection || { conn: null, promise: null };
global._mongooseConnection = cached;

const connectDB = async () => {
  if (isMemoryStoreEnabled()) {
    console.log('No MONGO_URI provided; using in-memory fallback storage');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, { bufferCommands: false })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log(`MongoDB Connected: ${cached.conn.connection.host}`);
  return cached.conn;
};

export default connectDB;