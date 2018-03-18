var Http = require("kit-http/index.js");
var { 
  Router
 } = Http;
var handleRouterError = R.curry(((res, e) => {
	
  res.writeHead(500);
  return res.end(e.message);

}));
var { 
  FileSystem
 } = require("kit-file-system"),
    { 
  serveStaticFiles
 } = require("./static-files");
var staticDir = FileSystem.load("./");
var app = create(Http.MiddleWare)();
var js = Interface.define("js", { 
  client:FileSystem.load("./client")
 });
var html = Interface.define("html", { 
  files:FileSystem.load("./html")
 });
app.use("/html", serveStaticFiles(html.files));
app.use("/js", serveStaticFiles(js.client));
module.exports = app;