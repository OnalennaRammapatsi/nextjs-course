import { MongoClient } from 'mongodb';

// Function to establish a database connection.
export async function connectDatabase() {
 // Create a MongoDB client and connect to the database using the provided connection string.
    const client = await MongoClient.connect(
        "mongodb+srv://ona:10wqxSiWn5Vih1iM@cluster0.2hse5qj.mongodb.net/events?retryWrites=true&w=majority"
    );
    return client;
}
// Function to insert a document into a specified collection.
export async function insertDocument(client, collection, document) {
     // Get a reference to the database.
    const db = client.db();
        // Insert the provided document into the specified collection and store the result.
    const result = await db.collection(collection).insertOne(document);
    return result;
}
// Function to retrieve all documents from a specified collection with optional sorting.
export async function getAllDocuments(client, collection, sort) {
    const db = client.db();
    // Use the 'find' method to retrieve all documents from the specified collection.
      const documents = await db
      .collection(collection)
      .find()
      .sort(sort) // Sort the documents if a sorting parameter is provided.
      .toArray();// Convert the retrieved documents into an array.
      return documents;
}