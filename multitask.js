const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

// res is an event emitter
// not a full response object

function doRequest() {
    https
        .request("https://www.google.com", (res) => {
            res.on("data", () => {});
            res.on("end", () => {
                console.log("request: ", Date.now() - start);
            });
        })
        .end();
}

// for (let i = 0; i < 5; i++) {
//     doRequest();
// }

function doHash() {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
        console.log("hash:", Date.now() - start, "ms");
    });
}

doRequest();

fs.readFile("multitask.js", "utf8", () => {
    console.log("FS:", Date.now() - start, "ms");
});

doHash();
doHash();
doHash();
doHash();
