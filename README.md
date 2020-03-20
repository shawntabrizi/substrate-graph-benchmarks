# substrate-graph-benchmarks
Graph the benchmark output of Substrate Pallets.
 
# How To

## Manual
 
To access the benchmark feature of Substrate, you need to compile your node using the `runtime-benchmarks` feature flag.
 
1. Clone Substrate: https://github.com/paritytech/substrate/
2. Navigate to the `cli` folder (`cd ./bin/node/cli/`)
3. Compile your node in release mode with the correct feature flag.

```
cargo build --release --features=runtime-benchmarks
```

4. When this is done, navigate back to the `substrate` root folder (`cd ../../..`)
5. Run your benchmark.

Make sure to run your benchmark with the following flags:

```
--chain dev --execution=wasm --wasm-execution=compiled
```

Here is an example of a full benchmark:

```
./target/release/substrate benchmark \
    --chain dev \
    --execution=wasm \
    --wasm-execution=compiled \
    --pallet balances \
    --extrinsic transfer \
    --steps 100 \
    --repeat 10 \
    > transfer_worst_case.txt
```

## Ansible

The Ansible Playbook can connect to multiple machines, execute the benchmarks and collect the results locally by issuing one command. The only required configuration file is `ansible/inventory.sample`, where the machines are listed and the SSH user is specified.

```ini
[servers]
<ip-address>
<ip-address>

[all:vars]
ansible_user=<ssh-user>
```

The Playbook assumes all machines share the same SSH user. For straightforward usage, pubkey authentication is recommended including adding the identities to the authentication agent (`ssh-add`).

Execute the Playbook by specifying the inventory file:

```bash
ansible-playbook -i ansible/inventory.sample ansible/run-benchmarks.yml
```

The execution takes quite some while. The benchmark results will be saved separately by their corresponding host in `ansible/results/` (directory will be created once the benchmarking finishes). Additionally, the results contain a `DEVICE_INFO.md` file for each host consisting of information about the device.

The Ansible Playbook can be executed multiple times on the same hosts without issues.

### Troubleshooting

- If there are problems connecting to a remote, manual `ssh <host>` connection should be tried. Permission errors, certificate changes and other issues can be easily discovered this way.
- If a user has to provide a password for becoming root remotely, the `--ask-become-pass` parameter can be supplied to the `ansible-playbook` command above. Individual, per-host sudo passwords can be specified in the inventory:
    ```ini
    [servers]
    <ip-address> ansible_sudo_pass=<sudo-password>
    <ip-address> ansible_sudo_pass=<sudo-password>
    ```
- For uncomplicated access, enable pubkey authentication and add the identities via `ssh-add -i ~/.ssh/<access_key>`.

# CLI Flags

* `--chain`: Set the chainspec you want to use for running benchmarks. This chainspec is used to populate the genesis state of the runtime when you run a benchmark. Default value is `Flaiming Fir` which **does not** have benchmarks in the runtime. So you will need to use somethign like `dev` else you will get a nasty error message.

* `--execution`: By default, the runtime benchmarks will run in Native. If you want to accurately test the runtime, use `--execution=wasm` to ensure that the benchmarks execute in a Wasm environment.

* `--wasm-execution`: By default, the Wasm execution uses Wasmi, which is notoriously slow. Instead, we can use `--wasm-execution=compiled` to instead use `wasm-time` which is much faster, and probably what we will use in the mainnet.

* `--pallet`: The pallet you want to benchmark. Not all of them are supported out of the box, so you will need to look at the Substrate source code to know which ones you can call. You will get an understandable error message if you input this incorrectly.

* `--extrinsic`: The extrinsic you want to benchmark. Note that you may be able to benchmark **more** than just the extrinsics available. Look at the benchmarks for a pallet to see all the benchmarks you can run.

* `--steps`: The number of "steps" you want to take. This varies the input paramters to the benchmarks. So if the user count could be between 0 and 100, and we pick `--steps 10`, it will run benchmarks at 0, 10, 20, 30, ... , 100.

* `--repeat`: The number of times to repeat the exact same benchmark with the exact same input parameters. Total number of benchmarks will be `steps` * `repeat`.

* `---lowest-range-values`: A comma seperated list of numbers which control the lower range of the different params used in `steps`

* `---highest-range-values`: A comma seperated list of numbers which control the lower range of the different params used in `steps`

Output will _mostly_ be in CSV format (with two lines of metadata at the top). You can output this to a txt file for ingestion.
