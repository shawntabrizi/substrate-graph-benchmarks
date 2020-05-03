# Benchmarking Results

This page will summarize the results collected for the various benchmarks on Substrate/Polkadot master.

## Results

Here are the results of our benchmarking tests.

### Database Operations Weight

With a RocksDB database of 200,000 items, we have found:

* 25 µs for 1 DB read
* 100 µs for 1 DB write

[Learn More >](database.md)

### Block Construction Base Weight

Importing a block with 0 extrinsics, we have found the overhead to be approximately 5 ms.

[Learn More >](block-exec.md)

### Extrinsic Base Weight

Importing a block with 10,000 no-op extrinsics, we have found the overhead of a single signed extrinsic to be approximately 125 µs.

[Learn More >](extrinsic.md)

### Runtime Extrinsic Weight

The results of our runtime extrinsic testing can be found <a href="../">here</a>.

The individual results of each extrinsic varies, but for the sake of analysis, we will focus our attention on a balance transfer.

We have found the following:

* Transfer Worst Case: 80 µs.
* Transfer Keep Alive: 60 µs.
* Transfer Best Case: 45 µs.

<a href="../">Learn More ></a>.

## Analysis
