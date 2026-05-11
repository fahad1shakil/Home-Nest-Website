const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://mil10:WiLakgat2PZV0yrO@cluster0.81dwyib.mongodb.net/?appName=Cluster0';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('home-nest-dbb');
    const coll = db.collection('nesthome');
    const property = await coll.findOne({});
    console.log('Sample property:', JSON.stringify(property, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
run();
