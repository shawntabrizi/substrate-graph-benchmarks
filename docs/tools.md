# Benchmarking Tools

There are three main tools used for benchmarking Substrate.

* `bench` cli
* `benchmark` cli w/ Runtime `benchmarks!` macro
* `substrate-graph-benchmarks` (this website)

## `bench` cli

TODO

## `benchmark` cli

The `benchmark` cli allows you to execute individual extrinsics using the actual Substrate runtime environment and measure the performance of that extrinsic across varying components.

This CLI depends on runtime developers to first write custom benchmarking code within the runtime using the `benchmarks!` macro. These benchmarks should assume worst possible conditions and execute over a range of components.

The benchmarks can be broken into three parts:

```rust
benchmarks! {
	extrinsic_name {
		// setup
	}: _{ // execute extrinsic}
	verify {
		// verification
	}
}
