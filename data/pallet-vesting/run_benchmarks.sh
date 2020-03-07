./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet vesting --extrinsic vest --steps 10 --repeat 100 > vest.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet vesting --extrinsic vest_other --steps 10 --repeat 100 > vest-other.txt
./target/release/substrate benchmark --chain dev --execution=wasm --wasm-execution=compiled --pallet vesting --extrinsic vested_transfer --steps 10 --repeat 100 > vested-transfer.txt
