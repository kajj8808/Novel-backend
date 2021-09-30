import { getNovels, insertNovel, updateNovel, delteNovel } from "./mongo";

import express from "express";
import cors from "cors";

const PORT = 4200;

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const novels = await getNovels();
  res.json(novels);
});

app.listen(PORT, () => console.log(`port ${PORT} on.`));

const mongoTest = async () => {
  for (const novel of novels) {
    console.log(novel);

    //console.log(await updateNovel(novel["_id"], "updateText"));
    //console.log(await delteNovel(novel["_id"]));
  }
};

//mongoTest();

/*
    await insertNovel({
    novelData: {
      creator: "creator",
      title: "title",
      text: "text",
      comments: "comments number",
      createBy: "create name",
      like: 5,
      disLike: 1,
      tag: ["tag1", "tag2", "tag3", "tag4"],
    },
  });
 */

//createCollection("novel");
