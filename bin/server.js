/** Hookup Express */
const express = require("express");
const app = express();

/** Configure our body Parser */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/diagnostic", (req, res) => res.status(200).end("OK"));
app.all("*", (req, res) => req.query.url
  ? res.redirect(req.query.url)
  : res.status(400).json({ error: "no url" }));

/*eslint no-process-env: "off"*/
app.listen(process.env.PORT || 3000);
