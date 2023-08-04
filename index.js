process.env.UV_THREADPOOL_SIZE = 1; // default 4
const cluster = require("cluster");
const crypto = require("crypto");
const express = require("express");

console.log({
    isMaster: cluster.isMaster,
});

const app = express();

if (cluster.isMaster) {
    // Cause index.js to be executed *again* but in child mode
    // a single call creates a single child, same as calling index.js without cluster
    // to create multiple children, call fork multiple times

    for (let i = 0; i < 1; i++) {
        cluster.fork();
    }
} else {
    // Im a child, Im going to act like a server and do nothing else
    app.get("/", (req, res) => {
        crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
            res.send("Hi there");
        });
    });

    app.get("/fast", (req, res) => {
        res.send("This was fast!");
    });

    app.listen(3000);
}
