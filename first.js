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

const replaceFunc= (tempCard,data)=>{
let obj=tempCard.replace(/{%Logo%}/g,data.image); ``
obj=obj.replace(/{%ProductName%}/g,data.productName);
obj=obj.replace(/{%Quantity%}/g,data.quantity);
obj=obj.replace(/{%Price%}/g,data.price);
obj=obj.replace(/{%id%}/g,data.id);
obj=obj.replace(/{%Place%}/g,data.from);
obj=obj.replace(/{%Nutrient%}/g,data.nutrients);
obj=obj.replace(/{%Number%}/g,data.quantity);
obj=obj.replace(/{%Price%}/g,data.price);
obj=obj.replace(/{%Description%}/g,data.description);

if(!data.organic) {obj=obj.replace(/{%Not Organic%}/g,'not-organic');}

console.log(obj);
return obj;

}


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const responseData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathname = req.url;

  //Overview section

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const content=responseData.map(e=>replaceFunc(tempCard,e)).join('');
    const output=tempOverview.replace('{%Cards%}',content);
    res.end(output);
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
