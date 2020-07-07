# Benchmarking The Runtime

The goal of this page is to explain how we benchmark the individual runtime functions and assign weight values to them.

## Overview

The Substrate runtime is composed of distinct pallets, each of which expose various dispatchable functions. The weight of each of these functions are completely independent of one another, and can vary based on the logical path executed based on the inputs and existing state.

To benchmark these runtime functions, we execute them within the actual Wasm runtime, in worst case scenarios. With runtime extrinsics where the input or existing state may effect the complexity of the execution, we test the extrinsic by varying those components and using regression analysis to extract results.

The runtime benchmarks are broken into two pieces:

* Timing Dispatch Function Logic
* Tallying Database Reads and Writes

Because

## How To

To list all available benchmarks, run:

```
./target/release/substrate benchmark --chain dev --pallet "*" --extrinsic "*" --steps 0
```

You will get an output like this:

```
TODO ADD
```

Using this information, you can execute a runtime benchmark by running:

```bash
./target/release/substrate benchmark \
    --chain dev \ # Configurable Chain Spec
    --execution=wasm \ # Always test with Wasm
    --wasm-execution=compiled \ # Always used `wasm-time`
    --pallet balances \ # Select the pallet
    --extrinsic transfer \ # Select the extrinsic
    --steps 50 \ # Modify the range of values to test for this extrinsic
    --repeat 20 \ # Adjust the number of times we repeat a benchmark
    --raw \ # Output the raw data from the benchmark process
> balances_transfer.txt # Results are outputted to file
```

Output will look like <a href="../data/balances_transfer.txt">this</a>.

A the bottom you will find a mean-square-analysis of the data, which you can use to quickly derive your extrinsic weights:

```
Model:
Time ~=     80.1
    + u        0
    + e        0
              µs
```

To measure the number of database operations that an extrinsic takes, we run the same benchmark, but turning on the `--logs state=trace,benchmark=trace` flag:

```bash
./target/release/substrate benchmark
    --chain dev \
    --steps 5 \ # Less steps and no repeats since there is no timing involved here
    --pallet balances \
    --extrinsic transfer \
    --log state=trace,benchmark=trace
2> balances_transfer.log
```

Output will look like <a href="../data/balances_transfer.log">this</a> after it has been cleaned up a little.

## How the Benchmark Works

The core part of the runtime benchmarking setup is being able to construct the real runtime environment to test our extrinsics in. From that point, our runtime benchmarks has three sections:

```rust
extrinsic_name {
	// setup
}: _(// execute our extrinsic)
```

Our benchmarks will always start with with whatever state is in our chain specification. So from that state, we first run any code needed to setup our benchmark. For example, if we are testing a transfer, we will need to fund the caller account with some tokens to transfer. If we want to test various staking extrinsics, we may need to fund accounts, have them bonded, and then signal nominations.

All of these setup procedures are executed before we start timing our benchmark. Once things are set up correctly, we start a system timer and time how long it takes to execute the extrinsic.

To capture logs about the database operations happening during our benchmarks, we enable the `--logs state=trace,benchmark=trace` flag. The `state=trace` flag tells us every database operation that is occurring as we execute our benchmark, and the `benchmark=trace` flag emits a log at the beginning and end of benchmark execution, so we know which parts of the log to attribute to a particular extrinsic benchmark.

From that point, we can do analysis on the results and come up with accurate details about how long each extrinsic takes and how many database operations it executes as a function of its components.

## Assumptions

We make the following assumptions when benchmarking the Substrate runtime.

### Empty Genesis

We do not prepare the genesis state of the runtime before running any benchmarks. It is known that increasing database saturation will have a negative impact on the performance of read and write operations, however this is already accounted for in our database read/write benchmarks. All maps and double maps will essentially be treated in a worst case scenario

### Worst Case Scenario

The runtime benchmarks will always choose the worst case scenario to be defensive against attacks. Individual extrinsics may have multiple logic paths they can follow where it is not clear which will be most complex. In these cases, there should be multiple benchmarks testing the same extrinsic, and following the different paths. We will choose the most conservative numbers in all situations.

### Complexity

There is an assumption that no functions within the Substrate runtime are superlinear in complexity. Thus, all regression analysis is linear.

### Polkadot

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
