# Setup dependencies, skip installation
curl https://getsubstrate.io -sSf | bash -s -- --fast

# Download and compile Substrate with benchmarking features
git clone https://github.com/paritytech/substrate
cd substrate/bin/node/cli
cargo build --release --features=runtime-benchmarks
cd ../../../..

# Destination directory for results
mkdir -p out

# Run benchmarks
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic transfer --steps 100 --repeat 10 > out/transfer_worst_case.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic transfer_best_case --steps 100 --repeat 10 > out/transfer_best_case.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic transfer_keep_alive --steps 100 --repeat 10 > out/transfer_keep_alive.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic set_balance --steps 100 --repeat 10 > out/set_balance_creating.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic set_balance_killing --steps 100 --repeat 10 > out/set_balance_killing.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic add_registrar --steps 100 --repeat 10 > out/add_registrar.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic set_identity --steps 100 --repeat 10 > out/set_identity.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic set_subs --steps 100 --repeat 10 > out/set_subs.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic clear_identity --steps 100 --repeat 10 > out/clear_identity.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic request_judgement --steps 100 --repeat 10 > out/request_judgement.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic cancel_request --steps 100 --repeat 10 > out/cancel_request.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic set_fee --steps 100 --repeat 10 > out/set_fee.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic set_account_id --steps 100 --repeat 10 > out/set_account_id.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic set_fields --steps 100 --repeat 10 > out/set_fields.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic provide_judgement --steps 100 --repeat 10 > out/provide_judgement.txt
./substrate/target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic kill_identity --steps 100 --repeat 10 > out/kill_identity.txt
