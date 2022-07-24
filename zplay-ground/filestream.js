var fs = require("fs");

const readFile = () => {
  var data = "";
  // Create a readable stream
  var readerStream = fs.createReadStream("input.txt");
  // Set the encoding to be utf8.
  readerStream.setEncoding("UTF8");
  // Handle stream events --> data, end, and error
  readerStream.on("data", function (chunk) {
    data += chunk;
  });

  readerStream.on("end", function () {
    console.log(data);
  });

  readerStream.on("error", function (err) {
    console.log(err.stack);
  });

  console.log("Program Ended");
};

const writeFile = () => {
  var data = "Simply Easy Learning";
  // Create a writable stream
  var writerStream = fs.createWriteStream("output.txt");
  // Write the data to stream with encoding to be utf8
  writerStream.write(data, "UTF8");
  // Mark the end of file
  writerStream.end();
  // Handle stream events --> finish, and error
  writerStream.on("finish", function () {
    console.log("Write completed.");
  });
  writerStream.on("error", function (err) {
    console.log(err.stack);
  });
  console.log("Program Ended");
};
async function compress() {
  
  // Compress the file input.txt to input.txt.gz
  fs.createReadStream("input.txt")
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream("input.txt.gz"));
  console.log("File Compressed.");
}


async function decompress(){
    var fs = require("fs");
    var zlib = require('zlib');
    
    // Decompress the file input.txt.gz to input.txt
    fs.createReadStream('input.txt.gz')
       .pipe(zlib.createGunzip())
       .pipe(fs.createWriteStream('input.txt'));
      
    console.log("File Decompressed.");
}
decompress()

