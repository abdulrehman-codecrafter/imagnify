import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URI || '';

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Augment NodeJS global interface to include our mongoose connection
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: MongooseConnection;
    }
  }
}

// Initialize global.mongoose if it doesn't exist yet
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const cached = global.mongoose;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'imagnify',
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
}
