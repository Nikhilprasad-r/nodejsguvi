import fs from "fs";
import path from "path";

function listDirectoryItems(directoryPath) {
  fs.readdir(directoryPath, (err, items) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    console.log("Items in directory:");
    items.forEach((item) => {
      fs.stat(path.join(directoryPath, item), (err, stats) => {
        if (err) {
          console.error("Error accessing item:", err);
          return;
        }

        if (stats.isFile()) {
          console.log(`${item} - File`);
        } else if (stats.isDirectory()) {
          console.log(`${item} - Folder`);
        }
      });
    });
  });
}

const userInputPath = process.argv[2];

if (!userInputPath) {
  console.error("Please provide a directory path.");
  process.exit(1);
}

fs.stat(userInputPath, (err, stats) => {
  if (err) {
    console.error("Error accessing directory:", err);
    process.exit(1);
  }

  if (!stats.isDirectory()) {
    console.error("Provided path is not a directory.");
    process.exit(1);
  }

  listDirectoryItems(userInputPath);
});
