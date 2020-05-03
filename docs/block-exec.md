# Benchmarking Block Execution

The goal of this page is to explain how we benchmark the overhead invoked by simply importing a block, independent of the number of extrinsics that block contains.

## Overview

Importing an empty block has some base overhead that we want to account for in the overall weight of a block.

Essentially, it includes all of the logic in the Executive `execute_block` except executing the extrinsics:

```rust
/// Actually execute all transitions for `block`.
pub fn execute_block(block: Block) {
	Self::initialize_block(block.header());

	// any initial checks
	Self::initial_checks(&block);

	let batching_safeguard = sp_runtime::SignatureBatching::start();

	// execute extrinsics
	let (header, extrinsics) = block.deconstruct();
	Self::execute_extrinsics_with_book_keeping(extrinsics, *header.number());  // <-- Ignore this stuff

	if !sp_runtime::SignatureBatching::verify(batching_safeguard) {
		panic!("Signature verification failed.");
	}

	// any final checks
	Self::final_checks(&header);
}
```

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

## Assumptions

### Database

While this block does not make significant changes to the underlying database, it does update the timestamp. The underlying Substrate database is pre-populated with 50,000 funded accounts.

### Timestamp Extrinsic

It is impossible to import a block that does not update the timestamp, therefore this "empty block" does contain 1 transaction (as noted in the log above). This is negligible compared to the overall time of block import.
