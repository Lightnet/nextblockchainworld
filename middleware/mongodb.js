

// https://stackoverflow.com/questions/60660488/is-it-possible-to-run-mongoose-inside-next-js-api
// https://dev.to/raphaelchaula/adding-mongodb-mongoose-to-next-js-apis-3af
import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.mongodburl, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  });
  return handler(req, res);
};

export default connectDB;

/*
import mongoose from 'mongoose';
import { BookDocument } from './book.interface';
import { BookSchema } from './book.schema';

export const BookModel = mongoose.models.Book || mongoose.model<BookDocument>('Book', BookSchema);
export default BookModel;
*/


/*

const MongoClient = require('mongodb').MongoClient;
let cachedDb: any = null;

export const connectToDatabase = async () => {
  if (cachedDb) {
    console.log('👌 Using existing connection');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(process.env.DB, {
    native_parser: true,
    useUnifiedTopology: true
  })
    .then((client) => {
      let db = client.db('dbname');
      console.log('🔥 New DB Connection');
      cachedDb = db;
      return cachedDb;
    })
    .catch((error) => {
      console.log('Mongo connect Error');
      console.log(error);
    });
};
*/

/*
let cachedDb = null

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
export default async function connectToDatabase() {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb
  }

  // If no connection is cached, create a new one
  const db = await mongoose.createConnection(uri, {
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0, // and MongoDB driver buffering
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  // Cache the database connection and return the connection
  cachedDb = db
  return db
}
*/