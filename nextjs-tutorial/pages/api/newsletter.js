import { connectDatabase, insertDocument } from '../../components/helpers/db-util'

// Define an async function named "handler" to handle HTTP requests.
async function handler(req, res) {
    // Check if the HTTP request method is POST.
    if (req.method === 'POST') {
        // Extract the user's email from the request body.
        const userEmail = req.body.email;
// Validate the email address.
        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' })
            return;
        }
        let client;
        try {
            // Attempt to connect to the database.
            client = await connectDatabase();
        } catch (error) {
          res.status(500).json({message: 'Connecting to the database failed!'});
          return;
         }
        try {
             // Insert the user's email address into the "newsletter" collection in the database.
            await insertDocument(client, 'newsletter',{ email: userEmail })
            client.close();
        } catch (error) {
            res.status(500).json({message: 'Inserting data failed!'});
            return;
        }
        // Send a 201 Created response indicating successful signup.
        res.status(201).json({ message: 'Signed Up!' });
    }
}
export default handler;
















