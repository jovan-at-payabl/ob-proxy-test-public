const express = require("express");
const fs = require("fs");
const https = require("https");

var app = express();
app.use(express.json());

app.all("*", (req, res) => {
  console.log("Received request:", req.socket.getPeerCertificate());
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  res.status(200).json({
    received: {
      certificate: req.socket.getPeerCertificate(),
      headers: req.headers,
      body: req.body,
    },
  });
});

https
  .createServer(
    {
      key: fs.readFileSync("bank.key"),
      cert: fs.readFileSync("bank.crt"),
      requestCert: true,
      rejectUnauthorized: false,
    },
    app
  )
  .listen(9441, () => {
    console.log("Bank listening");
  });
