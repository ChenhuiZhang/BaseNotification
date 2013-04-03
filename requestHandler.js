var exec = require("child_process").exec;

function index(response) {
  console.log("Request handler 'index' was called.");

  var content = "Hello, world";

  exec("ls -lah", function(error, stdout, stderr) {
    content = stdout;
  });

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(content);
  response.end();
}

function notify(response) {
  console.log("Request handler 'notify' was called.");
}

exports.index = index;
exports.notify = notify;

