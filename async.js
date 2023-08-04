const https = require("https");

const start = Date.now();

// res is an event emitter
// not a full response object

function doRequest() {
    https
        .request("https://www.google.com", (res) => {
            res.on("data", () => {});
            res.on("end", () => {
                console.log(Date.now() - start);
            });
        })
        .end();
}

for (let i = 0; i < 5; i++) {
    doRequest();
}
