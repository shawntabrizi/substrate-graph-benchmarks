# Benchmarking Extrinsic Overhead

The goal of this page is to explain how we benchmark the overhead invoked by simply including an extrinsic into a block, independent of the logic that extrinsic invokes.

## Overview

Our runtime benchmarks calculate the weight of dispatchable functions. However, it does not take into account the overhead that is invoked for every extrinsic.

This includes:

* Incrementing the nonce of the calling account
* Calculating and charging a fee for the transaction
* Modifying System state like:
	* Extrinsic Count
	* An Event
	* etc...

This is the `ExtrinsicBaseWeight` we allow you to configure in the runtime. Regardless if an extrinsic is successful or not, or if the underlying runtime logic is complex or simple, this `ExtrinsicBaseWeight` will apply.

> **NOTE:** Likely, we should have this configuration trait be split into a `signed` and `unsigned` variant since the overhead of a `signed` transaction is greater than that of an `unsigned` transaction. For example, and unsigned transaction will not do any nonce or fee manipulation. For now, we do not make this distinction, and assume always the weight of a signed extrinsic.

## How To

To execute this benchmark, simply run:

```bash
cargo run --release -p node-bench -- ::node::import::wasm::sr25519::noop::custom --transactions 10000
```

The output will look like:

```bash
# truncated for clarity
2020-05-01 20:37:37 imported block with 10001 tx, took: 1.241417064s
2020-05-01 20:37:37 usage info: caches: (3.67 MiB state, 0 bytes db overlay), state db: (168 bytes non-canonical, 0 bytes pruning, 44 bytes pinned), i/o: (0 tx, 0 write, 0 read, 0 avg tx, 40001/50033 key cache reads/total, 18897 trie nodes writes)
2020-05-01 20:37:37 Import benchmark (Noop(10000), Wasm): avg 1.26 s, w_avg 1.26 s
```

This tells us that it takes 1.26 seconds to import a block with 10,000 no-op transactions.

**Thus, we can derive that overhead of one extrinsic is approximately 125 microseconds.**

## How the Benchmark Works

To calculate the base weight of an extrinsic, we fill a block full of no-op extrinsics. For this test we use a System `remark` extrinsic with no input.

We generate random accounts with funds so they are able to make transactions, from which we dispatch N System `remark` transactions to fill our block.

Finally, we import the same block using a Wasm runtime envrionment 100 times, and collect the average and weighted average time for block import of that block.

## Assumptions

The following assumption are made when evaluating extrinsic overhead.

### Accounts

We populate the database with 50,000 random accounts, all of whom have a balance of 100 * DOLLARS.

### Signed vs Unsigned Extrinsic

This test specifically checks the overhead of a signed extrinsic, which we know to be more computationally heavy than an unsigned extrinsic. For now, we treat both kinds of extrinsics with the same overhead.

### Additional Overhead

Testing a block import may include other overheads like the time it takes to execute a block independent of the transactions included in that block. However, when testing 10,000 transactions, this overhead becomes proportionately very small.

From other tests, we know that the overhead of importing a block with no transactions is approximately 5 ms, so we would be off by the order of nanoseconds here, which seems mostly negligible.

### Batch Signature Verification

While importing a block, a background process running asynchronously to the runtime block import is used to verify the signatures of the block. This means that the overhead of signature verification for a block with 10,000 transactions will be proportionately smaller than a block with only 10 transactions. However, for the purposes of preventing DOS attacks, and avoiding producing blocks that are "too big", this is a factor that gets smaller with an increased number of transactions. So we may optimistically assume best case scenario here with the overhead of a single extrinsic.
