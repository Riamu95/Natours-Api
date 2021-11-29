const { application } = require('express');
const express = require('express');

const server = express();
const port = 3000;

server.get('/' , (req, res ) => {
    res.status(200).send("Hello from the server");
});


server.listen(3000, () => {
    console.log(`Listening on Port ${port}`);
});