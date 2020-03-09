# substrate-graph-benchmarks
Graph the benchmark output of Substrate Pallets.
 
# How To
 
To access the benchmark feature of Substrate, you need to compile your node using the `runtime-benchmarks` feature flag.
 
1. Clone Substrate: https://github.com/paritytech/substrate/
2. Navigate to the `cli` folder (`cd ./bin/node/cli/`)
3. Compile your node in release mode with the correct feature flag.

```
cargo build --release --features=runtime-benchmarks
```

4. When this is done, navigate back to the `substrate` root folder (`cd ../../..`)
5. Run your benchmark.

Make sure to run your benchmark with the following flags:

```
--chain dev --execution=wasm --wasm-execution=compiled
```

Here is an example of a full benchmark:

```
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic transfer -s 100 -r 10 > transfer_worst_case.txt
```
