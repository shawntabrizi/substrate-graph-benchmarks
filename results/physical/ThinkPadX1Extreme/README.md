# Device Info

Device: ThinkPad X1 Extreme
OS: Ubuntu 19.10
OS type: 64-bit
Memory: 15.1 GB
Processor: Intel Core i7-8750H CPU @ 2.20GHz * 12 
Graphics: GeForce GTX 1050 Ti with Max-Q Design/PCIe/SSE2
Disk: 256.1 GB

# Versions
rustc: 1.42.0 (b8cedc004 2020-03-09)
substrate: 2.0.0-alpha.4-9fa8589d9-x86_64-linux-gnu

# Benchmark Output:
```bash
Benchmarking => pallet: pallet-balances, extrinsic: transfer
  - Done.
Benchmarking => pallet: pallet-balances, extrinsic: transfer_best_case
  - Done.
Benchmarking => pallet: pallet-balances, extrinsic: transfer_keep_alive
  - Done.
Benchmarking => pallet: pallet-balances, extrinsic: set_balance
  - Done.
Benchmarking => pallet: pallet-balances, extrinsic: set_balance_killing
  - Done.
Benchmarking => pallet: pallet-identity, extrinsic: add_registrar
  - Done.
Benchmarking => pallet: pallet-identity, extrinsic: set_identity
  - Done.
Benchmarking => pallet: pallet-identity, extrinsic: set_subs
  - Done.
Benchmarking => pallet: pallet-identity, extrinsic: clear_identity
  - Done.
Benchmarking => pallet: pallet-identity, extrinsic: request_judgement
  - Done.
Benchmarking => pallet: pallet-identity, extrinsic: cancel_request
  - Done.
Benchmarking => pallet: pallet-identity, extrinsic: set_fee
  - Done.
Benchmarking => pallet: pallet-identity, extrinsic: set_account_id
  - Done.
Benchmarking => pallet: pallet-identity, extrinsic: set_fields
  - Done.
Benchmarking => pallet: pallet-identity, extrinsic: provide_judgement
  - Done.
Benchmarking => pallet: pallet-identity, extrinsic: kill_identity
  - Done.
Benchmarking => pallet: pallet-vesting, extrinsic: vest_locked
  - Done.
Benchmarking => pallet: pallet-vesting, extrinsic: vest_not_locked
  - Done.
Benchmarking => pallet: pallet-vesting, extrinsic: vest_other_locked
  - Done.
Benchmarking => pallet: pallet-vesting, extrinsic: vest_other_not_locked
  - Done.
Benchmarking => pallet: pallet-vesting, extrinsic: vested_transfer
  - Done.
Benchmarking => pallet: pallet-timestamp, extrinsic: set
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: bond
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: bond_extra
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: unbond
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: withdraw_unbonded
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: validate
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: nominate
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: chill
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: set_payee
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: set_controller
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: set_validator_count
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: force_no_eras
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: force_new_era
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: force_new_era_always
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: set_invulnerables
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: force_unstake
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: cancel_deferred_slash
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: payout_validator
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: payout_nominator
  - Error: "EmptyTargets"
Benchmarking => pallet: pallet-staking, extrinsic: rebond
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: set_history_depth
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: reap_stash
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: new_era
  - Done.
Benchmarking => pallet: pallet-staking, extrinsic: do_slash
  - Done.
```

