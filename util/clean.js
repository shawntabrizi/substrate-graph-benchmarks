// Main function which needs to run at start
async function main() {
	var args = process.argv;

	const fs = require('fs');
	const path = require('path');

	// This gets the filename from commandline
	let dirname = path.join(__dirname, args[2]);

	fs.readdir(dirname, function (err, filenames) {
		if (err) throw err;

		filenames.forEach(function (filename) {
			let filepath = path.join(__dirname, args[2], filename);

			let lines_saved = false;
			let lines_deleted = false;

			fs.readFile(filepath, { encoding: 'utf-8' }, function (err, data) {
				if (err) throw err;
				let dataArray = data.split('\n'); // convert file data in an array

				let length = dataArray.length;

				for (let i = length - 1; 0 <= i; i--) {
					if (!(dataArray[i].includes("End Benchmark"))) {
						dataArray.splice(i, 1);
						lines_deleted = true;
					} else {
						while (!(dataArray[i].includes("Start Benchmark"))) {
							i--;
						}
						// Skip the start benchmark line
						// This file seems to be correct to clean up, so we will save it
						if (i >= 0) {
							lines_saved = true;
						}
					}
				}


				if (lines_saved && lines_deleted) {
					console.log("Saving File")
					const updatedData = dataArray.join('\n');
					fs.writeFile(filepath, updatedData, (err) => {
						if (err) throw err;
						console.log('Successfully updated the file data');
					});

				}
			});
		});
	});
}

main()
