import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URI || '';

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const cached = global.mongoose;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
    dbName: 'imagnify',
    bufferCommands: false,
  });

  cached.conn = await cached.promise;
  return cached.conn;
}
