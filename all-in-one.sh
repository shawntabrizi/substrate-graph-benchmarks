curl https://getsubstrate.io -sSf | bash -s -- --fast

git clone -b shawntabrizi-bench-balances https://github.com/shawntabrizi/substrate.git 

cd substrate

cargo build --release

./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic transfer -s 100 -r 10 > transfer_worst_case.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic transfer_best_case -s 100 -r 10 > transfer_best_case.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic transfer_keep_alive -s 100 -r 10 > transfer_keep_alive.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic set_balance -s 100 -r 10 > set_balance_creating.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic set_balance_killing -s 100 -r 10 > set_balance_killing.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic add_registrar --steps 10 --repeat 100 > add_registrar.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic set_identity --steps 10 --repeat 100 > set_identity.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic set_subs --steps 10 --repeat 100 > set_subs.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic clear_identity --steps 10 --repeat 100 > clear_identity.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic request_judgement --steps 10 --repeat 100 > request_judgement.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic cancel_request --steps 10 --repeat 100 > cancel_request.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic set_fee --steps 10 --repeat 100 > set_fee.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic set_account_id --steps 10 --repeat 100 > set_account_id.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic set_fields --steps 10 --repeat 100 > set_fields.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic provide_judgement --steps 10 --repeat 100 > provide_judgement.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet pallet-identity --extrinsic kill_identity --steps 10 --repeat 100 > kill_identity.txt