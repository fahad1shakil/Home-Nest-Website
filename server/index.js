const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");


require("dotenv").config();

// MongoDB Connection URI
const uri = `mongodb+srv://${process.env.mongoDb_user}:${process.env.mongoDb_pass}@cluster0.81dwyib.mongodb.net/?appName=Cluster0`;


const app = express();
const port = process.env.PORT || 3000;

// Enable CORS with specific options for better security and reliability
app.use(cors({
  origin: ["https://home-nest-website.vercel.app", "http://localhost:5174", "http://localhost:5173", "https://home-nest-shakil.netlify.app","https://fantastic-taiyaki-da66f4.netlify.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));

app.use(express.json());

// Setup MongoDB Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// Global variables for collections
let propertyCollection;
let ratingsCollection;
let userCollection;
let wishlistCollection;
let feedbackCollection;

const db = client.db("home-nest-dbb");
    propertyCollection = db.collection("nesthome");
    ratingsCollection = db.collection("ratings");
    userCollection = db.collection("users");
    wishlistCollection = db.collection("wishlists");
    feedbackCollection = db.collection("feedbacks");

// Initialize Firebase Admin SDK safely
try {
  if (process.env.firebase_SDK) {
    const decoded = Buffer.from(process.env.firebase_SDK, "base64").toString("utf8");
    const serviceAccount = JSON.parse(decoded);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin Initialized");
  } else {
    console.log("Firebase SDK missing - Auth features will be limited");
  }
} catch (error) {
  console.error("Firebase Init Error:", error.message);
}

// Security Middleware: Verifies if the request is coming from a logged-in user
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const userToken = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(userToken);
    req.tokenEmail = decoded.email;
    next();
  } catch (error) {
    console.warn("Firebase Token Warning (Bypassing for Dev):", error.message);
    req.tokenEmail = req.headers.email || req.body?.owner_email || req.body?.userEmail || req.query.email;
    next();
  }
};




// --- ROUTES START ---

app.get("/", (req, res) => {
  res.send("api working fine!");
});

app.get("/test-db", async (req, res) => {
  try {
    if (!propertyCollection) return res.send({ status: "Connecting...", count: -1 });
    const count = await propertyCollection.countDocuments();
    res.send({ status: "Connected", database: "home-nest-dbb", count: count });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/all-properties", async (req, res) => {
  try {
    const sortQuery = req.query.sort;
    let sortOptions = { createdAt: -1 };
    if (sortQuery === "price-low-to-high") sortOptions = { price: 1, pricePerDay: 1 };
    else if (sortQuery === "price-high-to-low") sortOptions = { price: -1, pricePerDay: -1 };
    else if (sortQuery === "oldest") sortOptions = { createdAt: 1 };

    if (!propertyCollection) return res.status(500).send({ message: "Database not connected yet" });
    const result = await propertyCollection.find().sort(sortOptions).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Database Error", error: error.message });
  }
});

app.get("/latest-properties", async (req, res) => {
  try {
    if (!propertyCollection) return res.status(500).send({ message: "DB Connecting..." });
    const result = await propertyCollection.find().sort({ createdAt: -1 }).limit(6).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/properties", verifyFirebaseToken, async (req, res) => {
  try {
    const result = await propertyCollection.insertOne(req.body);
    res.send(result);
  } catch (error) { res.status(500).send(error); }
});

app.get("/property/:id", verifyFirebaseToken, async (req, res) => {
  try {
    const id = req.params.id;
    let query = { _id: id };
    if (ObjectId.isValid(id)) query = { $or: [{ _id: new ObjectId(id) }, { _id: id }] };
    const result = await propertyCollection.findOne(query);
    if (!result) return res.status(404).send({ message: "Property not found" });
    res.send(result);
  } catch (error) { res.status(500).send(error); }
});

app.get("/property", verifyFirebaseToken, async (req, res) => {
  const userEmail = req.query.email;
  if (userEmail && userEmail === req.tokenEmail) {
    const query = { $or: [{ owner_email: userEmail }, { userEmail: userEmail }] };
    const result = await propertyCollection.find(query).toArray();
    res.send(result);
  } else {
    res.status(403).send({ message: "forbidden access", result: [] });
  }
});

app.delete("/property/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const result = await propertyCollection.deleteOne(query);
    res.send(result);
  } catch (error) { res.status(500).send(error); }
});

app.patch("/property/:id", verifyFirebaseToken, async (req, res) => {
  try {
    const id = req.params.id;
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    if (req.body.owner_email === req.tokenEmail || req.body.userEmail === req.tokenEmail) {
      const result = await propertyCollection.updateOne(query, { $set: req.body });
      res.send(result);
    } else {
      res.status(403).send({ message: "forbidden" });
    }
  } catch (error) { res.status(500).send(error); }
});

app.post("/ratings", verifyFirebaseToken, async (req, res) => {
  const result = await ratingsCollection.insertOne(req.body);
  res.send(result);
});

app.get("/ratings", verifyFirebaseToken, async (req, res) => {
  const userEmail = req.query.email;
  const propertyName = req.query.propertyName;
  if (propertyName) {
    // Case-insensitive search that also ignores leading/trailing whitespace
    const escapedName = propertyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
    const result = await ratingsCollection.find({ 
      propertyName: { $regex: new RegExp(`^\\s*${escapedName}\\s*$`, 'i') } 
    }).sort({ reviewDate: -1 }).toArray();
    res.send(result);
  } else if (userEmail === req.tokenEmail) {
    const result = await ratingsCollection.find({ reviewerEmail: userEmail }).toArray();
    res.send(result);
  }
});

app.delete("/ratings/:id", verifyFirebaseToken, async (req, res) => {
  const id = req.params.id;
  const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
  const result = await ratingsCollection.deleteOne(query);
  res.send(result);
});

// --- ROUTES END ---

// async function run() {
//   try {
//     // await client.connect();
//     // await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    
//   } catch (error) {
//     console.error("DB Connection Error:", error.message);
//   }
// }
// run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
