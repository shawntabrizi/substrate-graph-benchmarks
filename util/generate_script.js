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
		let executable = "./substrate/target/release/substrate"
		let benchmark = "benchmark"
		let chain = "--chain dev"
		let execution = "--execution=wasm --wasm-execution=compiled"
		let logging = "--log state-trace=trace,benchmark=trace"
		let steps = "--steps 20"
		let repeat = "--repeat 20"
		let pallet = "--pallet " + pallet_name
		let extrinsic = "--extrinsic " + extrinsic_name
		let raw = "--raw"
		let output_log = "2> ./output/" + pallet_name + "_" + extrinsic_name + ".log"
		let output_data = "> ./output/" + pallet_name + "_" + extrinsic_name + ".txt"
		let final_log = [executable, benchmark, chain, steps, pallet, extrinsic, logging, output_log].join(" ")
		let final_data = [executable, benchmark, chain, steps, repeat, pallet, extrinsic, raw, execution, output_data].join(" ")

		all_script.push(final_log)
		all_script.push(final_data)
	}

	let output = all_script.join('\n')

	fs.writeFileSync("../all-in-one.sh", output);
}

main()
