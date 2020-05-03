# Benchmarking The Runtime

The goal of this page is to explain how we benchmark the individual runtime functions and assign weight values to them


## Assumptions

We make the following assumptions when benchmarking the Substrate runtime.

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
