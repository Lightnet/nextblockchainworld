// https://tutorialedge.net/nodejs/reading-writing-files-with-nodejs/
var fs = require("fs");
/*
var data = "New File Contents";

fs.writeFile("temp.txt", data, (err) => {
  if (err) console.log(err);
  console.log("Successfully Written to File.");
});
*/
//fs.readFile("temp.txt", function(err, buf) {
  //console.log(buf.toString());
//});

//error check
//fs.readFile("not-found.txt", "utf-8", (err, data) => {
  //if (err) { console.log(err) }
  //console.log(data);
//})

fs.readFile("temp.txt", "utf-8", (err, data) => {
  if (err) { console.log(err) }
  console.log(data);
})

