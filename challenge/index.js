import fs from "fs";

const csv = fs.readFileSync("./challenge/input.csv");
const stringCsv = csv.toString();

const jsonTest = {
  msg: "Hello World!",
  type: "test",
};

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

createJsonFile("testFile", jsonTest);
console.log(stringCsv);
