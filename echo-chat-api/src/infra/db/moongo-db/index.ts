import mongoose from "mongoose";

export const connectToDatabase = () => new Promise((resolve, reject) => {
  mongoose.Promise = global.Promise;
  const dbConnection = mongoose.connection;

  dbConnection.on('error', (error) => reject(error));
  dbConnection.on('close', () => console.log('Database connection closed.'))
  dbConnection.once('open', () => resolve(dbConnection));

  try {
    mongoose.connect(process.env.DATABASE_URL!, { 
      dbName: 'echo-chat'
    });

    console.log('Database connection successful! ✅')
  } catch (err) {
    console.log(err)
  }
});