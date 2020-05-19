const yargs = require("yargs");
const fs = require("fs");

let fileName = yargs.argv.filename;
let fileNames = [];

// if user inputs file name
if (fileName) {
  fs.readFile("filesnames.txt", function (err, data) {
    if (err) {
      // when txt file doesn't exist, create and save the filenames array to txt file
      fileNames.push(fileName);
      addFileNametoTxtFile();
      createNewFile();
    } else {
      // add new filename to existing array in txt file if it doesn't exists already
      fileNames = JSON.parse(data.toString());
      if (fileNames.indexOf(fileName) > -1) {
        console.log("filename already exists, give a new file name");
      } else {
        fileNames.push(fileName);
        addFileNametoTxtFile();
        createNewFile();
      }
    }
  });

  addFileNametoTxtFile = () => {
    // save filenames to an array
    fs.writeFile("filesnames.txt", JSON.stringify(fileNames), (err, data) => {
      if (err) {
        return console.error(err);
      } else {
        console.log("File name stored sucessfully!");
      }
    });
  };

  createNewFile = () => {
    // create a new file
    fs.writeFile(fileName + ".txt", "You are awesome", (err, data) => {
      if (err) {
        return console.error(err);
      } else {
        console.log("Data Written sucessfully!");
      }
    });
  };

} else {
  console.log("pass the filename in the command line - node createfiles.js --filename name of the file");
  //node assignment.js --filename student
}
