import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URI || '';

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const cached = global.mongoose;

export async function connectToDatabase() {
  if (cached.conn) {
    console.log('Using cached database connection.');
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  try {
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
      dbName: 'imagnify',
      bufferCommands: false,
    });

    cached.conn = await cached.promise;
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }

  return cached.conn;
}
