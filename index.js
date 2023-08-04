const cluster = require("cluster");
const express = require("express");

console.log({
    isMaster: cluster.isMaster,
});

const app = express();

function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {
        // do nothing
    }
}

if (cluster.isMaster) {
    // Cause index.js to be executed *again* but in child mode
    // a single call creates a single child, same as calling index.js without cluster
    // to create multiple children, call fork multiple times

    for (let i = 0; i < 4; i++) {
        cluster.fork();
    }
} else {
    // Im a child, Im going to act like a server and do nothing else
    app.get("/", (req, res) => {
        doWork(5000);
        res.send("Hi there");
    });

    app.get("/fast", (req, res) => {
        res.send("This was fast!");
    });

    app.listen(3000);
}
