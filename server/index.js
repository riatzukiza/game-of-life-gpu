

(function(a, b, c) {
  /* ../../kit-lang/shell-utils/shell/node_modules/kit/inc/core/defs.sibilant:53:9 */

  return foo(this);
}).bind(this);





;
var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("kit/js/util");
var { 
  Interface
 } = require("kit-interface");
var Http = require("kit-http/index.js");
var { 
  Router
 } = Http;
var handleRouterError = R.curry(((res, e) => {
	
  res.writeHead(500);
  return res.end(e.message);

}));
var { 
  HtmlElement
 } = require("kit-html");
var { 
  FileSystem
 } = require("kit-file-system"),
    mimeTypes = require("mime-types"),
    Path = require("path");
var staticDir = FileSystem.load("./");
var PORT = (process.env.PORT || 8000);
var app = create(Http.MiddleWare)();
var server = create(Http.Server)(PORT);
var serveStaticFiles = (function serveStaticFiles$(sys) {
  /* serve-static-files eval.sibilant:30:0 */

  return async function serve({ 
    request,
    response,
    route,
    key
   }){
  
    var path = key.filter(((k) => {
    	
      return !((k === "." || k === ".."));
    
    })).join("/");
    var file = await sys.find(path);
    return (function() {
      if (file.isDir__QUERY()) {
        return response.end("directory");
      } else {
        var ext = Path.extname(file.path),
            mime = mimeTypes.lookup(ext);
        response.setHeader("Content-Type", mime);
        return file.readStream.pipe(response);
      }
    }).call(this);
  
  };
});
var js = Interface.define("js", { 
  client:FileSystem.load("./client")
 });
var html = Interface.define("html", { 
  files:FileSystem.load("./html")
 });
app.use("/html", serveStaticFiles(html.files));
app.use("/js", serveStaticFiles(js.client));
server.use(app);
server.start();