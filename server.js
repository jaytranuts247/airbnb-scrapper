const express = require("express");
const app = express();

const fs = require("fs");
const scrapper = require("./scrapper");

// middlewares
app.use(express.json({ extended: false }));

// routes
app.get("/", (req, res) => res.status(200).json({ status: "ok" }));

app.get("/scrape", (req, res) => {
  const url = req.query.url;
  (async () => {
    try {
      const html = await scrapper(url);
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (err) {
      console.log(err);
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ msg: err.message });
    }
  })();
});

const port = process.env.PORT || 3131;
app.listen(port, () => console.log(`app listening on port ${port}!`));