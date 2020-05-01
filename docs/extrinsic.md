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

```

```

## How the Benchmark Works

To calculate the base weight of an extrinsic, we fill a block full of no-op extrinsics. A simple example of this is using the System `remark` extrinsic with an empty vector.
