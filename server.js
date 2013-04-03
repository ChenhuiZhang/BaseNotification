var http = require("http");
var url = require("url");
var requestHandlers = require("./requestHandler");


var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

function start(port) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Receive request for " + pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});

    if (typeof handle[pathname] === 'function') {
      response.write(handle[pathname]());
    } else {
      console.log("No request handle found for " + pathname);
      response.write("Hello, world");
    }

    response.end();

  }

  http.createServer(onRequest).listen(port);
  console.log("Server has started.");
}

exports.start = start;


