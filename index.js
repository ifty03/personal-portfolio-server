const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://dbemajhon:omlH8ilzQheEjYTF@cluster0.tjsdk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  const projectCollection = client.db("myProjects").collection("project");

  try {
    await client.connect();

    app.get("/project", async (req, res) => {
      const result = await projectCollection.find().toArray();
      res.send(result);
    });

    app.get("/project/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await projectCollection.findOne(query);
      res.send(result);
    });
  } finally {
    //    await client.close()
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
