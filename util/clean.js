// Main function which needs to run at start
async function main() {
    var args = process.argv;

    const fs = require('fs');
    const readline = require('readline');
    const path = require('path');

    // This gets the filename from commandline
    let dirname = path.join(__dirname, args[2]);

    fs.readdir(dirname, function(err, filenames) {
        if (err) throw err;

        filenames.forEach(function(filename) {
            let in_filepath = path.join(__dirname, args[2], filename);
            let out_filepath = path.join(__dirname, args[2], "temp" + filename);

            const instream = fs.createReadStream(in_filepath);
            const outputFile = fs.createWriteStream(out_filepath);

            // Track when lines should be saved while processing stream
            let saveLine = false;
            // Track if the final file should be saved
            let saveFile = false;

            const rl = readline.createInterface({
                input: instream,
            });

            // Handle any error that occurs on the write stream
            outputFile.on('err', err => { console.error(err) })

            // Once done writing, rename the output to be the input file name
            outputFile.on('close', () => {
                if (saveFile) {
                    fs.rename(out_filepath, in_filepath, err => {
                        if (err) { console.error(err) }
                    })
                    console.log('Successfully updated the file data');
                } else {
                    // Remove temp file
                    fs.unlink(out_filepath, function(err) {
                        console.log("No updates");
                    });
                }
            })

            // Read the file and replace any text that matches
            rl.on('line', line => {
                if (line.includes("Start Benchmark")) {
                    // Start saving lines
                    saveLine = true;
                    saveFile = true;
                } else if (line.includes("End Benchmark") && saveLine) {
                    // Write this final line
                    outputFile.write(`${line}\n`)
                    saveLine = false;
                }

                if (saveLine) {
                    outputFile.write(`${line}\n`)
                }
            })

            // Done reading the input, call end() on the write stream
            rl.on('close', () => {
                outputFile.end()
            })
        });
    });
}

main()
