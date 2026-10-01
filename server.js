require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("CRITICAL ERROR: MONGODB_URI environment variable is not defined!");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection;

// Connect to MongoDB Atlas and keep the connection open
async function startServer() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    console.log("*********************************************************************************************");
    console.log("*********************************************************************************************");
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    const db = client.db("testDatabase");
    collection = db.collection("testCollection");
    
    // Start Express server ONLY after DB connects
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

    console.log("*********************************************************************************************");
    console.log("*********************************************************************************************");
    
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

// Basic health-check route for Render
app.get('/', (req, res) => {
  console.log("oooooooooooooooooooooooooooooServer is running and connected to MongoDB!oooooooooooooooooooooooo");
  
  res.send('Server is running and connected to MongoDB!');

});

// Test insert endpoint
app.get('/test-insert', async (req, res) => {
  try {
    const result = await collection.insertOne({ message: "Hello World", timestamp: new Date() });

    console.log("oooooooooooooooooooooooooooooDocument inserted!ooooooooooooooooooooooooooooooooooooooooooooooooo");
    res.json({ message: "Document inserted!", id: result.insertedId });

  } catch (err) {
    res.status(500).json({ error: "Insert failed" });
  }
});

startServer();