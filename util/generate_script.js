// Main function which needs to run at start
async function main() {


    const fs = require('fs');
    const d3 = require('d3');

    let file = fs.readFileSync("../all_benchmarks.csv", "utf8");
    let csv = d3.csvParse(file);

    let all_script = []

    let current_pallet = "";

    for (line of csv) {
        let pallet_name = line.pallet;
        if (pallet_name == current_pallet) {
            continue;
        } else {
            current_pallet = pallet_name;
        }
        //let extrinsic_name = line.extrinsic;
        // Options
        let name = "substrate";
        //let name = "polkadot";
        let executable = "./" + name + "/target/release/" + name;
        let benchmark = "benchmark";
        //let chain = "--chain dev"
        let chain = "--chain dev";
        let execution = "--execution=wasm --wasm-execution=compiled";
        //let logging = "--log state=trace,benchmark=trace";
        let steps_full = "--steps 50";
        //let steps_small = "--steps 5";
        let repeat = "--repeat 20";
        let pallet = "--pallet " + pallet_name;
        //let extrinsic = "--extrinsic " + extrinsic_name;
        let extrinsic = '--extrinsic "*"';
        let raw = "--raw";
        //let output_log = "2> ./output/" + pallet_name + "_" + extrinsic_name + ".log";
        let output = `--output ./${name}/bin/node/runtime/src/weights`;
        let header = `--header ./${name}/HEADER`;
        //let output_data = "> ./output/" + pallet_name + "_" + extrinsic_name + ".txt";

        // let final_log = [executable, benchmark, chain, steps_small, pallet, extrinsic, logging, output_log].join(" ");
        // all_script.push(final_log)

        let final_data = [executable, benchmark, chain, steps_full, repeat, pallet, extrinsic, raw, execution, header, output].join(" ");
        all_script.push(final_data)
    }

    let output = all_script.join('\n');

    fs.writeFileSync("../all-in-one.sh", output);
}

main()
