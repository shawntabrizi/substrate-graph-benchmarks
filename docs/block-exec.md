# Benchmarking Block Execution

The goal of this page is to explain how we benchmark the overhead invoked by simply importing a block, independent of the number of extrinsics that block contains.

## Overview

Importing an empty block has some base overhead that we want to account for in the overall weight of a block.

This overhead includes things like:

* Verifying the storage root
* Calculating the new storage root
* TODO ADD MORE DETAILS

## How To

To execute this benchmark, simply run:

```bash
cargo run --release -p node-bench -- ::node::import::wasm::sr25519::noop::empty
```

The output will look like:

```bash
# truncated for clarity
2020-05-01 21:52:49 imported block with 1 tx, took: 4.95538ms
2020-05-01 21:52:49 usage info: caches: (1.85 MiB state, 0 bytes db overlay), state db: (168 bytes non-canonical, 0 bytes pruning, 44 bytes pinned), i/o: (0 tx, 0 write, 0 read, 0 avg tx, 2/31 key cache reads/total, 22 trie nodes writes)
2020-05-01 21:52:49 Import benchmark (Noop(0), Wasm): avg 4.980714 ms, w_avg 4.978451 ms

```

This tells us that it takes ~5 milliseconds to import a block with no transactions.

## How the Benchmark Works

To execute this benchmark, we simply construct a block with zero transactions (other than `set_timestamp` which is required in every valid block). We then import this block using the Wasm runtime environment.
