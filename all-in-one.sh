# Setup dependencies, skip installation
curl https://getsubstrate.io -sSf | bash -s -- --fast

# Download and compile Substrate with benchmarking features
git clone https://github.com/paritytech/substrate
cd substrate/bin/node/cli
cargo build --release --features=runtime-benchmarks
cd ../../../..

# Destination directory for results
mkdir -p out/

## Convenience function for running benchmarks
# Arguments:
# - pallet
# - extrinsic
run_bench () {
	echo -ne "Benchmarking => pallet: $1, extrinsic: $2\n  - "
	./substrate/target/release/substrate benchmark\
		--chain dev\
		--execution=wasm\
		--wasm-execution=compiled\
		--pallet $1\
		--extrinsic $2\
		--steps 1\
		--repeat 1\
		> out/$1_$2.txt
}

# TEMP
run_bench "pallet-identity" "set_subs"
run_bench "pallet-identity" "clear_identity"
run_bench "pallet-identity" "kill_identity"

exit 0

# Run benchmarks
run_bench "pallet-balances" "transfer" # worst case
run_bench "pallet-balances" "transfer_best_case"
run_bench "pallet-balances" "transfer_keep_alive"
run_bench "pallet-balances" "set_balance"
run_bench "pallet-balances" "set_balance_killing"
run_bench "pallet-identity" "add_registrar"
run_bench "pallet-identity" "set_identity"
run_bench "pallet-identity" "set_subs"
run_bench "pallet-identity" "clear_identity"
run_bench "pallet-identity" "request_judgement"
run_bench "pallet-identity" "cancel_request"
run_bench "pallet-identity" "set_fee"
run_bench "pallet-identity" "set_account_id"
run_bench "pallet-identity" "set_fields"
run_bench "pallet-identity" "provide_judgement"
run_bench "pallet-identity" "kill_identity"
run_bench "pallet-vesting" "vest"
run_bench "pallet-vesting" "vest_other"
run_bench "pallet-vesting" "vested_transfer"

