const fs = require("fs");
/* const quote = " Prevention is better than cure";

for (let i = 0; i < 10; i++) {
  fs.writeFile(`.text-${i}.html`, quote2, (err) => {
    console.log("Completed");
  });
} */
//process.argv-----to get arguments from command
/* const quote2 = " Prevention is better than cure";
const [, , noOfFiles] = process.argv;
console.log(noOfFiles);
for (let i = 0; i < noOfFiles; i++) {
  fs.writeFile(`.text-${i}.html`, quote2, (err) => {
    console.log("Completed");
  });
} */
const { fstat } = require("fs");

/* fs.readFile("./cool.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("x", err);
  } else {
    console.log(data);
  }
});

const quote3 = "Sowmya Sammu";

fs.appendFile("./fun.html", "\n" + quote3, (err) => {
  console.log("completed appending");
}); */

fs.unlink("./deleteme.css", (err) => {
  console.log("deleted");
});
