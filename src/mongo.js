import { MongoClient } from "mongodb";

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://root:${MONGODB_PASSWORD}@cluster0.687lr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createCollection = (collectionName) => {
  client.connect((err, db) => {
    if (err) throw err;
    const novelDB = db.db("novelDB");
    novelDB.createCollection(collectionName, (err, res) => {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
};

const insertNovel = async (novelData) => {
  const myClient = await client.connect().catch((err) => console.log(err));
  if (!myClient) return;
  const id = new Date().getTime();
  const novelObj = { _id: id, ...novelData };

  try {
    const novelDB = myClient.db("novelDB");
    await novelDB.collection("novel").insertOne(novelObj);
    return id;
  } catch (err) {
    return "insert error";
  } finally {
    myClient.close();
  }
};

const getNovels = async () => {
  const myClient = await client.connect().catch((err) => console.log(err));
  if (!myClient) return;

  try {
    const novelDB = myClient.db("novelDB");
    const result = await novelDB.collection("novel").find({}).toArray();
    return result;
  } catch (err) {
    return err;
  } finally {
    myClient.close();
  }
};

const updateNovel = async (_id, text) => {
  const myClient = await client.connect().catch((err) => console.log(err));
  if (!myClient) return;

  try {
    const novelDB = myClient.db("novelDB");
    const updateTarget = { _id };
    const updateValue = { $set: { text } };
    await novelDB.collection("novel").updateOne(updateTarget, updateValue);
    return "update down";
  } catch (err) {
    return "update error";
  } finally {
    myClient.close();
  }
};

const delteNovel = async (id) => {
  const myClient = await client.connect().catch((err) => console.log(err));
  if (!myClient) return;

  try {
    const novelDB = myClient.db("novelDB");
    await novelDB.collection("novel").deleteOne({ _id: id });
    return "delte down";
  } catch (err) {
    return "delte error";
  } finally {
    myClient.close();
  }
};

const searchNovel = async(text) => {

}

export { getNovels, insertNovel, createCollection, updateNovel, delteNovel ,searchNovel };
