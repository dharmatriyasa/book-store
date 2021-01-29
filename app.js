const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Hello there!');
    next();
});

app.use((req, res, next) => {
    console.log('Hello there 1!');
    res.send("<h1>Hello from my express.js </h1>");
});

app.listen(3000);