import fs from "fs";

const csv = fs.readFileSync("./challenge/input.csv");
const csvArray = csv.toString().split("\r").toString().split("\n");
const result = [];
const headers = csvArray[0].replaceAll('"', "").split(",");
headers.pop();

function createJsonFile(fileName, fileContent) {
  fs.writeFile(
    `./challenge/${fileName}.json`,
    JSON.stringify(fileContent),
    (error) => {
      if (error) throw error;
      console.log("Done writing\n");
    }
  );
}

for (let h = 0; h < headers.length; h++) {
  const header = headers[h];
  const repeat = h !== headers.indexOf(header);
  if (repeat) {
    headers[h] += "_" + (h - headers.indexOf(header)).toString();
  }
}

for (let i = 1; i < csvArray.length; i++) {
  let obj = {};
  let line = csvArray[i];
  const regex = /\"([\w|\s|\d])*\,([\w|\s|\d])*\"/g;
  const attributes = line
    .replace(regex, (e) => e.replace(",", ";"))
    .split(",")
    .join("*")
    .replaceAll(";", ",")
    .replaceAll('"', "")
    .split("*");

  for (let j = 0; j < headers.length; j++) {
    obj[headers[j]] = attributes[j];
  }

  result.push(obj);
}

createJsonFile("output", result);
