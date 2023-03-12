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

app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/login.html');
});

app.get('/main.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/main.html');
});

app.get('/application.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/application.html');
});

app.get('/calendar.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/calendar.html');
});

app.get('/list.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/list.html');
});

app.get('/profile.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/profile.html');
});

app.get('/settings.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/settings.html');
});

app.get('/nav_before_login.html', (req, res) => {
  res.sendFile(__dirname + '/text/nav_before_login.html');
});

app.get('/nav_after_login.html', (req, res) => {
  res.sendFile(__dirname + '/text/nav_after_login.html');
});

app.get('/footer.html', (req, res) => {
  res.sendFile(__dirname + '/text/footer.html');
});

app.get('/aboutus.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/aboutus.html');
});

app.get('/detail.html', (req, res) => {
  res.sendFile(__dirname + '/app/html/detail.html');
});

// For resource not found (i.e., 404)
app.use(function (req, res, next) {
  res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
app.listen(8000, () => {
  console.log('Server started on port 8000');
});
