# Assumptions

To actually go about benchmarking Substrate, we must make many different assumptions which will be stated here.

## Hardware

TBD

### Processor

### Memory

### Hard Drive

Base disk speed is benchmarked with the following command:

```
fio --randrepeat=1 --ioengine=posixaio --direct=1 --gtod_reduce=1 --name=test --filename=test --bs=4k --iodepth=64 --size=4G --readwrite=randrw --rwmixread=75
```

### More Details

<details>
<summary>
<code>cat /proc/cpuinfo</code>
</summary>


</details>

## Software

```bash
$ rustc --version

rustc 1.42.0 (b8cedc004 2020-03-09)
```

## Database

### Key Length

We have generally found that the key length of items in RocksDB does not have a significant impact on the performance of DB operations.

See [Shorter keys #5439](https://github.com/paritytech/substrate/pull/5439).

### Value Size

TODO: The size of a value in storage does matter for encode/decode, but not really for trie traversal?

### Repeat Reads and Writes

Substrate has an abstraction layer that places any reads or writes to the DB into an _overlay change set_. The overlay change set is only committed once per block at the end of the block.

Generally this means we have the following behavior when interacting with the DB from the runtime:

* If you read a storage item for the first time, it will go all the way down to the underlying database and read that value. This would count as a single database read.

* If you read that storage item again, then it will actually read from the overlay change set, not from the DB. So this does not count as a database read.

* If you write to a storage item, it will write to the overlay change set, not the DB. This will also make any future read operation read from the overlay change set.

* At the end of the block, any storage item that has changed will be written to the DB. This counts as a DB write.

For this reason, our DbWeight only measures the cost read and write operations. Any changes in the overlay change set are measured through the runtime benchmarks using Memory DB.

### More Assumptions

Find Database Assumptions on the [database benchmarking page](database.md)

## Polkadot

The current scope of our benchmarking efforts is to launch the Polkadot Network.

### Runtime

Many pallets allow you to mix and match various configuration options which may cause large changes in the behavior of the pallets.

**The current benchmarking/weights will apply only to the FRAME Pallets as configured in the Polkadot Runtime.**

For example, we assume all instances of the `Currency` trait are implemented by the `pallet-balances` crate.

Furthermore, we assume that there is a tight coupling between various consensus and governance pallets:

* Im Online, Session, Staking, and Offences are tightly coupled
* Collective, Membership, and Democracy are tightly coupled
* etc...

These benchmarking results may not be safe for use in runtimes with a different configuration.

### Estimated Maximums

The weight of extrinsics and database operations will grow as the state of the blockchain is populated.

**These weights will only apply as long as these constraints hold for the blockchain state:**

```js
let sale_buyers = 4000;
let active_users = 5000;
let accounts = 100000;
let stakers = 20000;
let staking_history_depth = 84;
let staking_bonding_duration = 28;
let validators = 1000;
let voters = 50000;
let treasury = 1000;
let society = 150;
let parachains = 100;
let parathreads = 1000;
```

This is based on what we think may be a reasonable usage of the Polkadot network for the first year.
