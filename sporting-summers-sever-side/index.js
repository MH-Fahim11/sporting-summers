const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.Stripe_Key);
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// verifyJWT
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  // bearer token
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Key}@cluster0.mllrmzg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const usersCollection = client.db("sportingSummersDB").collection("users");
    const classesCollection = client
      .db("sportingSummersDB")
      .collection("classes");
    const selectedClassCollection = client
      .db("sportingSummersDB")
      .collection("selectedClass");
    const paymentCollection = client
      .db("sportingSummersDB")
      .collection("payment");

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.send({ token });
    });

    // use verifyJWT before using verifyAdmin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden message" });
      }
      next();
    };

    const verifyInstructor = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user?.role !== "instructor") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden message" });
      }
      next();
    };
    // users apis
    app.get("/users", verifyJWT, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: "user already exists" });
      }

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    // security layer: verifyJWT
    // email same
    // check admin
    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      if (req.decoded.email !== email) {
        res.send({ admin: false });
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { admin: user?.role === "admin" };
      res.send(result);
    });
    app.get("/users/instructor/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      if (req.decoded.email !== email) {
        res.send({ instructor: false });
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { instructor: user?.role === "instructor" };
      res.send(result);
    });

    app.patch("/users/setRole/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const key = req.query.key;
      // console.log(key,id)
      const filter = { _id: new ObjectId(id) };

      if (key === "admin") {
        const updateDoc = {
          $set: {
            role: "admin",
          },
        };

        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      } else if (key === "instructor") {
        const updateDoc = {
          $set: {
            role: "instructor",
          },
        };

        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    });

    // class api
    // get class by instructor
    app.get("/classes", verifyJWT, async (req, res) => {
      const email = req.query.email;
      if (!email) {
        res.send([]);
      }
      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }
      const query = { instructorEmail: email };
      const result = await classesCollection.find(query).toArray();
      res.send(result);
    });
    // get instructor
    app.get("/instructors", async (req, res) => {
      let query = { role: "instructor" };

      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });
    // get all classes
    app.get("/allClasses", verifyJWT, async (req, res) => {
      const cursor = classesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/PublicClasses", async (req, res) => {
      let query = { status: "approved" };

      if (req.query.sorted === "true") {
        const cursor = classesCollection.find(query).sort({ "enrolled": -1 });;
        const result = await cursor.toArray();
        res.send(result);
      }else{
        const cursor = classesCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
      }
      
    });

    // add only instructor classes
    app.post("/classes", verifyJWT, verifyInstructor, async (req, res) => {
      const newClass = req.body;
      const result = await classesCollection.insertOne(newClass);
      res.send(result);
    });
    // update class
    app.put("/update/:id", verifyJWT, verifyInstructor, async (req, res) => {
      const id = req.params.id;
      const myClass = req.body;
      let intPrice = parseFloat(myClass.price);
      let intAvailableSeats = parseFloat(myClass.availableSeats);

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedClass = {
        $set: {
          price: intPrice,
          availableSeats: intAvailableSeats,
        },
      };
      const result = await classesCollection.updateOne(
        filter,
        updatedClass,
        options
      );
      res.send(result);
    });
    // approved
    app.patch("/update/approved/:id", async (req, res) => {
      const id = req.params.id;
      const key = req.query.key;
      // console.log(key);
      // console.log(id);
      const filter = { _id: new ObjectId(id) };
      if (key === "approved") {
        const updateDoc = {
          $set: {
            status: "approved",
            enrolled: 0,
          },
        };
        const result = await classesCollection.updateOne(filter, updateDoc);
        res.send(result);
      } else if (key === "denied") {
        const updateDoc = {
          $set: {
            status: "denied",
          },
        };
        const result = await classesCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    });
    // feedback
    app.put("/update/feedback/:id", async (req, res) => {
      const id = req.params.id;
      const newFeedBack = req.body.feedBack;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          feedBack: newFeedBack,
        },
      };
      const result = await classesCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    // delete class
    app.delete(
      "/classes/:id",
      verifyJWT,
      verifyInstructor,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await classesCollection.deleteOne(query);
        res.send(result);
      }
    );

    //selectedClass

    app.post("/selectedClass", async (req, res) => {
      const classes = req.body;
      const result = await selectedClassCollection.insertOne(classes);
      res.send(result);
    });

    app.get("/selectedClass", verifyJWT, async (req, res) => {
      const email = req.query.email;

      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      const query = { email: email };
      const result = await selectedClassCollection.find(query).toArray();
      res.send(result);
    });
    app.delete("/selectedClass/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await selectedClassCollection.deleteOne(query);
      res.send(result);
    });

    //  payment intent
    app.post("/create-payment-intent", verifyJWT, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // payment related api
    app.post("/payments", verifyJWT, async (req, res) => {
      const payment = req.body;

      const insertResult = await paymentCollection.insertOne(payment);

      const query = { _id: new ObjectId(payment.id) };
      const deleteResult = await selectedClassCollection.deleteOne(query);

      res.send({ insertResult, deleteResult });
    });

    app.put("/increment/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $inc: { enrolled: +1, availableSeats: -1 },
      };
      const result = await classesCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    //enroled
    app.get("/enrolled", verifyJWT, async (req, res) => {
      const email = req.query.email;
      // console.log(email);

      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      const query = { email: email };
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    // for dashboard
    app.get('/stats', verifyJWT, async (req, res) => {
      const users = await usersCollection.estimatedDocumentCount();
      const classes = await classesCollection.estimatedDocumentCount();

      const payments = await paymentCollection.find().toArray();
      const revenue = payments.reduce( ( sum, payment) => sum + payment.price, 0)

      res.send({
        revenue,
        users,
        classes,
        payments
      })
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`server api running on port:${port}`);
});
