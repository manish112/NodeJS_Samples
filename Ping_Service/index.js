var http = require("http");
var config = require("./config");
var url = require("url");

var httpServer = http.createServer(function (req, res) {
  var parseUrl = url.parse(req.url);

  var pathName = parseUrl.pathname;
  var trimmedPath = pathName.replace(/^\/+|\/+$/g, "");

  var chooseHandler =
    typeof router[trimmedPath] !== "undefined"
      ? router[trimmedPath]
      : handlers.notFound;

  chooseHandler(function (statusCode, payload) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(statusCode);
    res.end(JSON.stringify(payload));
    console.log(trimmedPath, statusCode);
  });
});

httpServer.listen(config.port, function () {
  console.log("Listening on " + config.port + "...");
});

var handlers = {};

handlers.hello = function (callback) {
  callback(200, { message: "Welcome" });
};

handlers.notFound = function (callback) {
  callback(404, { message: "Not found" });
};
var router = {
  hello: handlers.hello,
};
