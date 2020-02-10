./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic transfer -s 100 -r 10 > transfer_worst_case.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic transfer_best_case -s 100 -r 10 > transfer_best_case.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic transfer_keep_alive -s 100 -r 10 > transfer_keep_alive.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic set_balance -s 100 -r 10 > set_balance_creating.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet balances --extrinsic set_balance_killing -s 100 -r 10 > set_balance_killing.txt
