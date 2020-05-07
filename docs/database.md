# Benchmarking Database Operations

This page will cover how we benchmark database operations in the Substrate runtime.

## Overview

Database operations in the Substrate runtime are well understood to have a significant overhead on the overall execution of extrinsics.
Measuring the performance of the database can depend on many variables, and Substrate even supports swapping the database layer with other backends for potential optimization.
As such, we have isolated the weight of database operations separate from the rest of the

## How To

To benchmark your database read and write speeds, simply run:

```bash
cargo run --release -p node-bench -- ::trie::read::large
cargo run --release -p node-bench -- ::trie::write::large
```

The resulting output will look like:

```bash
2020-05-01 14:24:20 Starting Trie read benchmark(large database (200,000 keys), db_type: RocksDb)
2020-05-01 14:24:57 Trie read benchmark(large database (200,000 keys), db_type: RocksDb): avg 25.6 µs, w_avg 24.4 µs
2020-05-01 14:24:57 Starting Trie read benchmark(large database (200,000 keys), db_type: ParityDb)
2020-05-01 14:25:20 Trie read benchmark(large database (200,000 keys), db_type: ParityDb): avg 7.8 µs, w_avg 7.7 µs

2020-05-01 14:32:09 Starting Trie write benchmark(large database (200,000 keys), db_type = RocksDb)
2020-05-01 14:32:44 Trie write benchmark(large database (200,000 keys), db_type = RocksDb): avg 0.10 ms, w_avg 97.9 µs
2020-05-01 14:32:44 Starting Trie write benchmark(large database (200,000 keys), db_type = ParityDb)
2020-05-01 14:33:06 Trie write benchmark(large database (200,000 keys), db_type = ParityDb): avg 47.5 µs, w_avg 46.5 µs
```
</details>

From this, we can extract our `DbWeight` values using the weighted average `w_avg` for our expected database type.

So our resulting DbWeight is:

```rust
// 1 µs -> 1_000_000 weight
pub const DbWeight: RuntimeDbWeight = RuntimeDbWeight {
	read: 25_000_000, // ~25 µs
	write: 100_000_000, // ~100 µs
};
```

## How the Benchmark Works

TODO

## Assumptions

The following assumptions are made when benchmarking the database.

### Database Backend

This benchmark currently tests two different backends:

1. RocksDB
2. ParityDB

[ParityDB](https://github.com/paritytech/parity-db) is an experimental blockchain specific database that is generally more more performant than the standard RocksDb backend.

However, since it is experimental in nature, it will not be the default choice for Substrate/Polkadot.

**All of our weight data is chosen with RocksDb.**

### Number of Items

The time it takes to do read and write operations in Substrate directly depends on the number of items that exist in the state trie.

**For our current database benchmarking, we assume a database with 200,000 items.** The benchmark results will report timing for other

### Repeat Reads and Writes

Repeat read and write assumptions can be found on the main [assumptions](assumptions.md) page.

### Key Length

Random 32 byte keys are chosen.

### Value Sizes

This benchmark uses a distribution of values similar to the distribution of values in the Kusama database.

This distribution is recorded here: https://github.com/paritytech/substrate/blob/master/bin/node/bench/src/state_sizes.rs
