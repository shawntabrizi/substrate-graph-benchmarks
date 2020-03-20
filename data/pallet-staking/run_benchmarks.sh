./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet staking --extrinsic bond -s 10 -r 100 > bond.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet staking --extrinsic bond_extra -s 10 -r 100 > bond_extra.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet staking --extrinsic unbond -s 10 -r 100 > unbond.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet staking --extrinsic withdraw_unbonded -s 10 -r 100 > withdraw_unbonded.txt

./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet staking --extrinsic nominate -s 16 -r 100 > nominate.txt
