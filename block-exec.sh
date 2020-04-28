SP_PROFILER=file SP_PROFILER_FILENAME=noop-10.csv TX_QTY=10 OVERRIDE_EXT=1 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
SP_PROFILER=file SP_PROFILER_FILENAME=noop-50.csv TX_QTY=50 OVERRIDE_EXT=1 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
SP_PROFILER=file SP_PROFILER_FILENAME=noop-100.csv TX_QTY=100 OVERRIDE_EXT=1 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
SP_PROFILER=file SP_PROFILER_FILENAME=noop-500.csv TX_QTY=500 OVERRIDE_EXT=1 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
SP_PROFILER=file SP_PROFILER_FILENAME=noop-1000.csv TX_QTY=1000 OVERRIDE_EXT=1 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
SP_PROFILER=file SP_PROFILER_FILENAME=noop-1500.csv TX_QTY=1500 OVERRIDE_EXT=1 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
SP_PROFILER=file SP_PROFILER_FILENAME=noop-2000.csv TX_QTY=2000 OVERRIDE_EXT=1 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full


SP_PROFILER=file SP_PROFILER_FILENAME=transfer-10.csv TX_QTY=10 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
SP_PROFILER=file SP_PROFILER_FILENAME=transfer-50.csv TX_QTY=50 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
SP_PROFILER=file SP_PROFILER_FILENAME=transfer-100.csv TX_QTY=100 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
SP_PROFILER=file SP_PROFILER_FILENAME=transfer-500.csv TX_QTY=500 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
SP_PROFILER=file SP_PROFILER_FILENAME=transfer-1000.csv TX_QTY=1000 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
SP_PROFILER=file SP_PROFILER_FILENAME=transfer-1500.csv TX_QTY=1500 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
SP_PROFILER=file SP_PROFILER_FILENAME=transfer-2000.csv TX_QTY=2000 cargo run --release -p node-bench -- ::node::import::wasm::sr25519::full
