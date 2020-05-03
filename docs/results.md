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

In all of these cases, a balance transfer invokes 1 read and 1 write from the database.

<a href="../">Learn More ></a>.

## Analysis

### Estimated

With this data, we can estimate the time it should take to do one balance transfer (keep-alive):

* 125 (base) + 60 (extrinsic) + 25 (read) + 100 (write) = 310 µs

The sum of all weights in a single full block should be 2 seconds.

### Actual

Using the `node-bench` utility, we are able to construct a full block with only keep-alive balance transfers:

```
cargo run --release -p node-bench -- ::node::import::wasm::sr25519::transfer_keep_alive::custom --transactions 10000
```

Due to the weight limits we have placed on a single block, we are able to fill a block with 4822 keep alive transactions.

```bash
# truncated for clarity
2020-05-03 13:06:31 imported block with 4822 tx, took: 928.389359ms
2020-05-03 13:06:31 usage info: caches: (4.26 MiB state, 0 bytes db overlay), state db: (168 bytes non-canonical, 0 bytes pruning, 44 bytes pinned), i/o: (0 tx, 0 write, 0 read, 0 avg tx, 19285/28959 key cache reads/total, 20325 trie nodes writes)
2020-05-03 13:06:31 Import benchmark (RandomTransfersKeepAlive(10000), Wasm): avg 0.93 s, w_avg 0.93 s
```

Importing this block takes ~ 1 second, so we can conclude that we have overestimated our overall runtime weights by 100%.

If we divide the .93 seconds by 4822, we find that the weight of a single `transfer_keep_alive` is 192 µs. So we have overestimated the weight of `transfer_keep_alive` by 50%.
