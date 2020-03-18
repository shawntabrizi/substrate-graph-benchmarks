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
		--steps 100\
		--repeat 10\
		> out/$1.$2.txt
}

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

run_bench "pallet-vesting" "vest_locked"
run_bench "pallet-vesting" "vest_not_locked"
run_bench "pallet-vesting" "vest_other_locked"
run_bench "pallet-vesting" "vest_other_not_locked"
run_bench "pallet-vesting" "vested_transfer"

run_bench "pallet-timestamp" "set"

run_bench "pallet-staking" "bond"
run_bench "pallet-staking" "bond_extra"
run_bench "pallet-staking" "unbond"
run_bench "pallet-staking" "withdraw_unbonded"
run_bench "pallet-staking" "validate"
run_bench "pallet-staking" "nominate"
run_bench "pallet-staking" "chill"
run_bench "pallet-staking" "set_payee"
run_bench "pallet-staking" "set_controller"
run_bench "pallet-staking" "set_validator_count"
run_bench "pallet-staking" "force_no_eras"
run_bench "pallet-staking" "force_new_era"
run_bench "pallet-staking" "force_new_era_always"
run_bench "pallet-staking" "set_invulnerables"
run_bench "pallet-staking" "force_unstake"
run_bench "pallet-staking" "cancel_deferred_slash"
run_bench "pallet-staking" "payout_validator"
run_bench "pallet-staking" "payout_nominator"
run_bench "pallet-staking" "rebond"
run_bench "pallet-staking" "set_history_depth"
run_bench "pallet-staking" "reap_stash"
run_bench "pallet-staking" "new_era"
run_bench "pallet-staking" "do_slash"

