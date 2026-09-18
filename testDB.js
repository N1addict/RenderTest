require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://ollyDB:olivier@rendertest0.hclapb0.mongodb.net/?appName=RenderTest0";
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // pick (or create) a database and collection
    const db = client.db("testDatabase");
    const collection = db.collection("testCollection");

    // insert a document
    const result = await collection.insertOne({ message: "Hello World" });
    console.log(`Document inserted with _id: ${result.insertedId}`);
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
