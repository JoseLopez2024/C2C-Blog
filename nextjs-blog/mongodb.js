
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://emanuelopez625:w4qrADryhX6Z761T@firstcluster.wbonuet.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster";

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
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

export async function getServerSideProps() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("Blog_Data");
  const collection = db.collection("Blogs");

  const data = await collection.find({}, { projection: { title: 1, date: 1, body: 1 } }).toArray();
  client.close();

  return {
    props: { allserverData: JSON.parse(JSON.stringify(data)) },
  };
}

