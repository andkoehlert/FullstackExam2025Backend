import mongoose from "mongoose";


export async function testConnection() {

  try {
    await connect();
    await disconnect();
    console.log("Database connection test was succesful (connect + disconnect");
  }

  catch (error) {
    console.log("Error testing database connection. Error: " + error);
  }

}


export async function connect(){

try {

  if (!process.env.DBHOST) {
    throw new Error("DBHOST cant start")
  }
  await mongoose.connect(process.env.DBHOST);

  if(mongoose.connection.db) {
    await mongoose.connection.db.admin().command({ping: 1});
    console.log("connection check")
  }
    else {
      throw new Error("Database connection failed")
    }
}
catch (error) {
console.log("Error Connecting to database. Error: " + error);
}
}


export async function disconnect() {
  try {
      await mongoose.disconnect();
  }
  catch (error) {
      console.log("Error closing database connection. Error: " + error)
  }
}