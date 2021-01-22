/** Hookup Express */
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

/** Configure our body Parser */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Configure our Cookie Parser */
app.use(cookieParser());

app.get("/diagnostic", (_, res) => res.status(200).end("OK"));

/** Specific bounce */
app.get("/bounceme", (req, res) => {
  const _param = ~req.query.url.indexOf('?')
    ? `&_session=${req.cookies._session}`
    : `?_session=${req.cookies._session}`;

  return req.query.url
    ? res.redirect(`${req.query.url}${_param}`)
    : res.status(400).json({ error: "no url" });
});

const _getRedirectUrl = req =>
  `${process.env.AUTH_BOUNCE_URL}?url=https://${req.get('host')}${req.headers['x-starphleet-originalurl']}`;

/** Auth bounce */
app.all("*", (req, res) => process.env.AUTH_BOUNCE_URL
  // ? res.status(200).json({ url: _getRedirectUrl(req) })
  ? res.redirect(_getRedirectUrl(req))
  : res.status(400).json({ error: "no AUTH_BOUNCE_URL" }));

/*eslint no-process-env: "off"*/
app.listen(process.env.PORT || 3000);

