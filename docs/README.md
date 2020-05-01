# Substrate Benchmarking Documentation

These pages will give you an overview of our benchmarking process for Substrate in preparation for the Polkadot release.

## Overview

The goal of benchmarking Substrate is to

To represent the time used on-chain, we have the Weight abstraction. 1,000 units of Weight

## Breakdown

The Substrate benchmarking process can be broken down into the following components:

* Benchmarking Database Operations (Reads/Writes)
* Benchmarking Block Construction Overhead
* Benchmarking Extrinsic Overhead
* Benchmarking the Runtime
    * Dispatchable Function Logic
    * Number of DB Operations

With these individual components, we are able to paint a bottom up picture of how long it will take to execute a block:

* The base time it takes to execute an empty block.
* For each extrinsic:
    * The base time it takes to execute a no-op extrinsic.
    * The time it takes to execute the specific dispatchable function.
    * The time it takes to read and write to the underlying database as a result of the dispatchable function.
