import fs from "fs";

function createJsonFile(fileName, fileContent) {
  fs.writeFile(
    `./challenge/${fileName}.json`,
    JSON.stringify(fileContent),
    (error) => {
      if (error) throw error;
      console.log("\nDone writing\n");
    }
  );
}

const csv = fs.readFileSync("./challenge/input.csv");
const csvArray = csv.toString().split("\r").toString().split("\n");

const headers = csvArray[0]
  .split(", ")
  .toString()
  .replaceAll('"', "")
  .split(",");

headers.pop();

for (let i = 1; i < csvArray.length; i++) {
  let obj = {};
  let property = csvArray[i]
    .split(", ")
    .toString()
    .replaceAll('"', "")
    .split(",");
  property.pop();
  for (let j = 0; j < headers.length; j++) {
    obj[headers[j]] = property[j];
  }
  console.log(`Object ${i}: ${JSON.stringify(obj)}\n`);
}
