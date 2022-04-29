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

headers.forEach((header, index) => {
  const repeat = index !== headers.indexOf(header);
  if (repeat) {
    headers[index] += "_" + (index - headers.indexOf(header)).toString();
  }
});

csvArray.forEach((line, index) => {
  if (index > 0) {
    let obj = {};
    const regex = /\"([\w|\s|\d])*\,([\w|\s|\d])*\"/g;
    const attributes = line
      .replace(regex, (e) => e.replace(",", "+"))
      .split(",")
      .join("*")
      .replaceAll("+", ",")
      .replaceAll('"', "")
      .split("*");

    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = attributes[i];
    }
    result.push(obj);
  }
});

createJsonFile("output", result);
