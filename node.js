// REQUIRES
const express = require("express");
const app = express();

app.use(express.json());
const fs = require("fs");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.static('app'));
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

//Call back function
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/html/index.html');
  });

  app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/app/html/index.html');
  });

// For resource not found (i.e., 404)
app.use(function (req, res, next) {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
app.listen(8000, () => {
    console.log('Server started on port 8000');
  });
