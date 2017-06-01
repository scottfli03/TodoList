var http = require("http");
var port = 8081;
var serverURL = 'http://127.0.0.1:' + port + '/'

http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});

   if(req.url == "/index.html") {
    	fs.readFile("index.html", function(err, text){
    	res.setHeader("Content-Type", "text/html");
    	res.end(text);
    	});
    return;
	}
	res.setHeader("Content-Type", "text/html");
	res.end("<p>Hello World...</p>");
});

// Console will print the message
console.log('Server running at ' + serverURL);