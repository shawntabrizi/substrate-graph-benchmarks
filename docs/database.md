# Benchmarking Database Operations

This page will cover how we benchmark database operations in the Substrate runtime.

## Overview

Database operations in the Substrate runtime are well understood to have a significant overhead on the overall execution of extrinsics.
Measuring the performance of the database can depend on many variables, and Substrate even supports swapping the database layer with other backends for potential optimization.
As such, we have isolated the weight of database operations separate from the rest of the

## How To

To benchmark your database read and write speeds, simply run:

```
cargo run --release -p node-bench -- trie
```

The resulting output will look like:

<details>
<summary> Output (expand)</summary>

```
2020-05-01 14:23:44 Starting Trie read benchmark(empty database (200 keys), db_type: RocksDb)
2020-05-01 14:23:45 Trie read benchmark(empty database (200 keys), db_type: RocksDb): avg 6.1 µs, w_avg 6.1 µs
2020-05-01 14:23:45 Starting Trie read benchmark(empty database (200 keys), db_type: ParityDb)
2020-05-01 14:23:45 Trie read benchmark(empty database (200 keys), db_type: ParityDb): avg 3.9 µs, w_avg 3.9 µs
2020-05-01 14:23:45 Starting Trie read benchmark(smallest database (1,000 keys), db_type: RocksDb)
2020-05-01 14:23:45 Trie read benchmark(smallest database (1,000 keys), db_type: RocksDb): avg 7.6 µs, w_avg 7.6 µs
2020-05-01 14:23:45 Starting Trie read benchmark(smallest database (1,000 keys), db_type: ParityDb)
2020-05-01 14:23:46 Trie read benchmark(smallest database (1,000 keys), db_type: ParityDb): avg 4.6 µs, w_avg 4.6 µs
2020-05-01 14:23:46 Starting Trie read benchmark(small database (10,000 keys), db_type: RocksDb)
2020-05-01 14:23:48 Trie read benchmark(small database (10,000 keys), db_type: RocksDb): avg 21.2 µs, w_avg 19.0 µs
2020-05-01 14:23:48 Starting Trie read benchmark(small database (10,000 keys), db_type: ParityDb)
2020-05-01 14:23:50 Trie read benchmark(small database (10,000 keys), db_type: ParityDb): avg 5.7 µs, w_avg 5.6 µs
2020-05-01 14:23:50 Starting Trie read benchmark(medium database (100,000 keys), db_type: RocksDb)
2020-05-01 14:24:08 Trie read benchmark(medium database (100,000 keys), db_type: RocksDb): avg 21.8 µs, w_avg 20.3 µs
2020-05-01 14:24:08 Starting Trie read benchmark(medium database (100,000 keys), db_type: ParityDb)
2020-05-01 14:24:20 Trie read benchmark(medium database (100,000 keys), db_type: ParityDb): avg 7.4 µs, w_avg 7.3 µs
2020-05-01 14:24:20 Starting Trie read benchmark(large database (200,000 keys), db_type: RocksDb)
2020-05-01 14:24:57 Trie read benchmark(large database (200,000 keys), db_type: RocksDb): avg 25.6 µs, w_avg 24.4 µs
2020-05-01 14:24:57 Starting Trie read benchmark(large database (200,000 keys), db_type: ParityDb)
2020-05-01 14:25:20 Trie read benchmark(large database (200,000 keys), db_type: ParityDb): avg 7.8 µs, w_avg 7.7 µs
2020-05-01 14:25:20 Starting Trie read benchmark(huge database (1,000,000 keys), db_type: RocksDb)
2020-05-01 14:29:51 Trie read benchmark(huge database (1,000,000 keys), db_type: RocksDb): avg 4.782966 ms, w_avg 4.781659 ms
2020-05-01 14:29:51 Starting Trie read benchmark(huge database (1,000,000 keys), db_type: ParityDb)
2020-05-01 14:31:35 Trie read benchmark(huge database (1,000,000 keys), db_type: ParityDb): avg 8.6 µs, w_avg 8.6 µs
2020-05-01 14:31:35 Starting Trie write benchmark(empty database (200 keys), db_type = RocksDb)
2020-05-01 14:31:35 Trie write benchmark(empty database (200 keys), db_type = RocksDb): avg 43.2 µs, w_avg 43.2 µs
2020-05-01 14:31:35 Starting Trie write benchmark(empty database (200 keys), db_type = ParityDb)
2020-05-01 14:31:36 Trie write benchmark(empty database (200 keys), db_type = ParityDb): avg 30.3 µs, w_avg 30.1 µs
2020-05-01 14:31:36 Starting Trie write benchmark(smallest database (1,000 keys), db_type = RocksDb)
2020-05-01 14:31:36 Trie write benchmark(smallest database (1,000 keys), db_type = RocksDb): avg 52.8 µs, w_avg 52.6 µs
2020-05-01 14:31:36 Starting Trie write benchmark(smallest database (1,000 keys), db_type = ParityDb)
2020-05-01 14:31:36 Trie write benchmark(smallest database (1,000 keys), db_type = ParityDb): avg 34.5 µs, w_avg 33.7 µs
2020-05-01 14:31:36 Starting Trie write benchmark(small database (10,000 keys), db_type = RocksDb)
2020-05-01 14:31:38 Trie write benchmark(small database (10,000 keys), db_type = RocksDb): avg 93.1 µs, w_avg 77.6 µs
2020-05-01 14:31:38 Starting Trie write benchmark(small database (10,000 keys), db_type = ParityDb)
2020-05-01 14:31:40 Trie write benchmark(small database (10,000 keys), db_type = ParityDb): avg 39.3 µs, w_avg 38.8 µs
2020-05-01 14:31:40 Starting Trie write benchmark(medium database (100,000 keys), db_type = RocksDb)
2020-05-01 14:31:57 Trie write benchmark(medium database (100,000 keys), db_type = RocksDb): avg 0.12 ms, w_avg 0.10 ms
2020-05-01 14:31:57 Starting Trie write benchmark(medium database (100,000 keys), db_type = ParityDb)
2020-05-01 14:32:09 Trie write benchmark(medium database (100,000 keys), db_type = ParityDb): avg 45.7 µs, w_avg 45.4 µs
2020-05-01 14:32:09 Starting Trie write benchmark(large database (200,000 keys), db_type = RocksDb)
2020-05-01 14:32:44 Trie write benchmark(large database (200,000 keys), db_type = RocksDb): avg 0.10 ms, w_avg 97.9 µs
2020-05-01 14:32:44 Starting Trie write benchmark(large database (200,000 keys), db_type = ParityDb)
2020-05-01 14:33:06 Trie write benchmark(large database (200,000 keys), db_type = ParityDb): avg 47.5 µs, w_avg 46.5 µs
2020-05-01 14:33:06 Starting Trie write benchmark(huge database (1,000,000 keys), db_type = RocksDb)
2020-05-01 14:37:13 Trie write benchmark(huge database (1,000,000 keys), db_type = RocksDb): avg 3.722181 ms, w_avg 3.724226 ms
2020-05-01 14:37:13 Starting Trie write benchmark(huge database (1,000,000 keys), db_type = ParityDb)
2020-05-01 14:38:57 Trie write benchmark(huge database (1,000,000 keys), db_type = ParityDb): avg 50.6 µs, w_avg 50.5 µs
```
</details>

From this, we can extract our `DbWeight` values using the weighted average `w_avg` for our expected database population.

In the case of polkadot, this is 200,000 items. So from the data above we extract the following:

```
2020-05-01 14:24:57 Trie read benchmark(large database (200,000 keys), db_type: RocksDb): avg 25.6 µs, w_avg 24.4 µs
2020-05-01 14:32:44 Trie write benchmark(large database (200,000 keys), db_type = RocksDb): avg 0.10 ms, w_avg 97.9 µs
```

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
