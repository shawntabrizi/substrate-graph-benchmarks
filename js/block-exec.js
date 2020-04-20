async function parseData(text) {
    // Benchmark data is in *.txt
    input = './data/block_exec.txt';

    if (!text) {
        try {
            text = await d3.text(input);
        } catch (e) {
            document.getElementById('charts').innerText = e;
            return;
        }
    }

    var headers = ["info", "function", "time"].join(",");

    let csv = await d3.csvParse(headers + "\n" + text);

    let storage_root_before = {
        x: [],
        y: []
    };

    let storage_root_after = {
        x: [],
        y: []
    };

    let changes_root = {
        x: [],
        y: []
    };

    let execute_block = {
        x: [],
        y: []
    };

    let block_construction = {
        x: [],
        y: []
    };

    let import_benchmark = {
        x: [],
        y: []
    };

    let tx_per_block = 0;

    let before = true;

    for (row of csv) {
        if (row.info.includes("TX_PER_BLOCK")) {
            before = true;
            tx_per_block = row.info.split(" ")[0].split("=")[1];
        } else if (row.info.includes("Block construction")) {
            before = false;
            let time_text = row.info.split(" ")[4];
            let time = time_text.match(/\d+\.\d+/g)[0];
            let unit = time_text.match(/[a-zA-Z]+/g)[0];
            let multiplier = unit == "s" ? 1000 : 1;
            let txs = row.info.split(" ")[5].substr(1);
            block_construction.x.push(txs);
            block_construction.y.push(time * multiplier);
        } else if (row.info == "Storage" && row.function == "storage_root") {
            if (before) {
                storage_root_before.x.push(tx_per_block);
                storage_root_before.y.push(row.time);
            } else {
                storage_root_after.x.push(tx_per_block);
                storage_root_after.y.push(row.time);
            }
        } else if (row.info == "Storage" && row.function == "changes_root") {
            changes_root.x.push(tx_per_block);
            changes_root.y.push(row.time)
        } else if (row.info == "frame_executive" && row.function == "execute_block") {
            execute_block.x.push(tx_per_block);
            execute_block.y.push(row.time)
        } else if (row.info.includes("Import benchmark") && row.function.includes("avg")) {
            let time = row.function.split(" ")[3];
            // Multiply by 1000 if seconds
            let multiplier = row.function.split(" ")[4] == "s" ? 1000 : 1;
            import_benchmark.x.push(tx_per_block);
            import_benchmark.y.push(time * multiplier)
        }
    }

    let data = { storage_root_before, storage_root_after, changes_root, execute_block, block_construction, import_benchmark };

    createCharts(data);
}

function createCharts(split_data) {

    console.log(split_data)

    let keys = Object.keys(split_data);

    var counter = 0;
    for (key of keys) {

        let x = split_data[key].x;
        let time = split_data[key].y;

        var trace = {
            x: x,
            y: time,
            mode: 'markers',
            type: 'scatter',
            name: 'Raw Values',
            marker: { size: 6, color: 'grey' },
            hoverinfo: 'skip'
        };

        var average = {
            type: 'scatter',
            x: x,
            y: time,
            transforms: [{
                type: 'aggregate',
                groups: x,
                aggregations: [{ target: 'y', func: 'avg', enabled: true }]
            }],
            name: 'Average',
            line: { color: 'orange' }
        };

        var median = {
            type: 'scatter',
            x: x,
            y: time,
            transforms: [{
                type: 'aggregate',
                groups: x,
                aggregations: [{ target: 'y', func: 'median', enabled: true }]
            }],
            name: 'Median',
            line: { color: 'yellow' }
        };

        var min = {
            type: 'scatter',
            mode: 'markers',
            x: x,
            y: time,
            transforms: [{
                type: 'aggregate',
                groups: x,
                aggregations: [{ target: 'y', func: 'min', enabled: true }]
            }],
            name: 'Min',
            marker: { size: 4, color: 'green' }
        };

        var max = {
            type: 'scatter',
            mode: 'markers',
            x: x,
            y: time,
            transforms: [{
                type: 'aggregate',
                groups: x,
                aggregations: [{ target: 'y', func: 'max', enabled: true }]
            }],
            name: 'Max',
            marker: { size: 4, color: 'red' }
        };

        var layout = {
            title: {
                text: key
            },
            xaxis: {
                title: {
                    text: "TX Per Block"
                }
            },
            yaxis: {
                title: {
                    text: 'Time (ms)'
                }
            }
        };

        var chart = [trace, min, median, average, max];

        let chartDiv = document.createElement('div');
        chartDiv.id = 'myChart' + counter;
        chartDiv.classList.add('my-4', 'w-100', 'chart');

        document.getElementById('charts').appendChild(chartDiv);

        Plotly.newPlot('myChart' + counter, chart, layout);
        counter += 1;
    }
}

document.getElementById("paste-raw").addEventListener("input", async function(event) {
    let input = event.target.value;
    parseData(input);
});

parseData()
