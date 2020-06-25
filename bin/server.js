/** Hookup Express */
const express = require("express");
const app = express();

/** Configure our body Parser */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/diagnostic", (req, res) => res.status(200).end("OK"));

/** Specific bounce */
app.get("/bounceme", (req, res) => req.query.url
  ? res.redirect(req.query.url)
  : res.status(400).json({ error: "no url" }));

const _getRedirectUrl = req =>
  `${process.env.AUTH_BOUNCE_URL}?url=${req.protocol}://${req.get('host')}${req.originalUrl}`;

/** Auth bounce */
app.all("*", (req, res) => process.env.AUTH_BOUNCE_URL
  ? res.redirect(_getRedirectUrl(req))
  : res.status(400).json({ error: "no AUTH_BOUNCE_URL" }));

/*eslint no-process-env: "off"*/
app.listen(process.env.PORT || 3000);
