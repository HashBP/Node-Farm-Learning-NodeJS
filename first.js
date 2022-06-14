// Modules

const fs = require("fs");
const http = require("http");
const url = require("url");

// Read Write

// const read=fs.readFileSync('./1-node-farm/starter/txt/input.txt','utf-8');
// // console.log(read);
// const write=`This is all we know about avacado ${read}. On date ${Date.now()}.`;
// fs.writeFileSync('./1-node-farm/starter/txt/output.txt',write)
// console.log("file written")

// Server

const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const responseData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathname = req.url;

  //Overview section

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end("This is overview");
  }

  //Product section

  else if (pathname === "/product") {
    res.end("This is product");
  }

  //API section
  
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application-json" });
    res.end(data);
  }
  
  //Not Found section
  
  else res.end("Page not found");
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listning to requsts on port 8000.");
});
