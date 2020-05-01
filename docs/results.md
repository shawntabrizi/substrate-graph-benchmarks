# Benchmarking Results

This page will summarize the results collected for the various benchmarks on Substrate/Polkadot master.

## Database Operations Weight

With a RocksDB database of 200,000 items, we have found:

* 25 µs for 1 DB read
* 100 µs for 1 DB write

## Block Construction Base Weight

Importing a block with 0 extrinsics, we have found the overhead to be approximately 5 ms.

## Extrinsic Base Weight

Importing a block with
