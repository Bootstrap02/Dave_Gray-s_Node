const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "starter.txt"), "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("File has been read.");
});

fs.writeFile(
  path.join(__dirname, "reaction.txt"),
  "I am sure you have read my explanation by now. thanks",
  (err) => {
    if (err) {
      throw err;
    }
    console.log("File has been written.");
    
    fs.appendFile(
        path.join(__dirname, "reaction.txt"),
        "\n\nI am sure you have read my explanation by now. thanks",
        (err) => {
          if (err) {
            throw err;
          }
          console.log("File has been updated.");
        });
});

fs.appendFile(
  path.join(__dirname, "reply.txt"),
  "I am sure you have read my explanation by now. thanks",
  (err) => {
    if (err) {
      throw err;
    }
    console.log("File has been created.");
  });

  process.on('uncaughtException', (err)=>{
    console.error(`There as an uncaught Error: ${err}`)
  process.exit(1);
})
