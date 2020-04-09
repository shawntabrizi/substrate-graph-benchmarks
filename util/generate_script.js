// Main function which needs to run at start
async function main() {


	const fs = require('fs');
	const d3 = require('d3');

	let file = fs.readFileSync("../all_benchmarks.csv", "utf8");
	let csv = d3.csvParse(file);

	let all_script = []

	for (line of csv) {
		let pallet_name = line.pallet;
		let extrinsic_name = line.extrinsic;
		// Options
		let executable = "./target/release/substrate"
		let benchmark = "benchmark"
		let execution = "--execution=wasm --wasm-execution=compiled" //not used
		let steps = "--steps 20"
		let repeat = "--repeat 20"
		let pallet = "--pallet " + pallet_name
		let extrinsic = "--extrinsic " + extrinsic_name
		let raw = "--raw"
		let output_log = "2> " + pallet_name + "_" + extrinsic_name + ".log"
		let output_data = "> " + pallet_name + "_" + extrinsic_name + ".txt"
		let final = [executable, benchmark, raw, steps, repeat, pallet, extrinsic, output_data, output_log].join(" ")

		all_script.push(final)
	}

	let output = all_script.join('\n')

	fs.writeFileSync("../all-in-one.sh", output);
}

main()
