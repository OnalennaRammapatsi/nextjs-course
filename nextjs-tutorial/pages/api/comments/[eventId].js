// Import necessary functions from a database utility module.
import { connectDatabase, insertDocument, getAllDocuments } from "../../../components/helpers/db-util";
// Define an async function named "handler" to handle HTTP requests.
export default async function handler(req, res) {
    // Extract the "eventId" parameter from the request URL.
    const eventId = req.query.eventId
    let client;
    try {
        // Attempt to connect to the database.
        client = await connectDatabase()
    } catch(error){
        // Handle any errors that occur during database connection.
        res.status(500).json({message: 'Connecting to the database failed!'})
        return
    }
     // Handle POST requests.
    if(req.method === 'POST'){
        const {email, name, text} = req.body
        // Validate the input data
        if(
            !email.includes('@') ||
            !name || name.trim() === '' ||
            !text || text.trim() === '')
         {
             // If the input data is invalid, send a 422 Unprocessable Entity response.
            res.status(422).json({message: 'Invalid input'})
            client.close()
            return
        }
        // new comment object.
        const newComment = {
            email,
            name,
            text,
            eventId
        }
        let result
        try {
            // Insert the new comment into the database.
            result = await insertDocument(client, 'comments', newComment)
            // Assign the inserted comment's ID to the newComment object.
            newComment._id = result.insertedId
            res.status(201).json({message: 'Added comment', comment: newComment})
        } catch (error){
            // Handle any errors that occur during comment insertion.
            res.status(500).json({message: 'Inserting comment failed!'})
        }
       console.log(result)
    }
    // Handle GET requests.
    if(req.method === 'GET'){
        try {
            // Retrieve all comments from the database and sort them by "_id" in descending order.
            const documents = await getAllDocuments(client, 'comments', {_id: -1})
            res.status(200).json({comments: documents})
        } catch(error){
            // Handle any errors that occur during comment retrieval.
            res.status(500).json({message: 'Getting comments failed!'})
        }
    }
    client.close()
}