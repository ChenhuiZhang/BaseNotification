var http = require("http");
var url = require("url");
var requestHandlers = require("./requestHandler");


var handle = {}
handle["/"] = requestHandlers.index;
handle["/BaseNotificationServer"] = requestHandlers.notify;

function start(port) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Receive request for " + pathname);

    if (typeof handle[pathname] === 'function') {
      handle[pathname](response);
      response.end();
    } else {
      console.log("No request handle found for " + pathname);
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not found");
      response.end();
    }

  }

  http.createServer(onRequest).listen(port);
  console.log("Server has started.");
}

exports.start = start;


