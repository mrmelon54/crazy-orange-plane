import { getAbsolutePath } from "esm-path";
import path from "path";
import express from "express";
import got from "got";

const app = express();
const port = 3000;

const __dirname = getAbsolutePath(import.meta.url);

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/callback", async (req, res) => {
  const res1 = await got("https://api.modrinth.com/v2/user", {
    headers: { authorization: req.query.code },
  });
  console.log(res1.body);
  const j1 = JSON.parse(res1.body);
  console.log(j1.id);
  console.log(j1.username);
  const res2 = await got("https://api.modrinth.com/v2/user/" + j1.id, {
    method: "patch",
    headers: { authorization: req.query.code },
    json: {
      bio: "Programming nothing",
    },
  });
  console.log(res2);
  const { body } = await got("https://api.github.com/user", {
    headers: {
      accept: "application/vnd.github.v3+json",
      authorization: `token ${req.query.code}`,
    },
  });
  const strBody = JSON.stringify(body);
  res.send(
    `<script>window.opener.postMessage(JSON.parse(${strBody}),"https://crazy-orange-plane.glitch.me");</script>`
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
