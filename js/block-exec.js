async function parseData(text) {
    // Benchmark data is in *.txt

    if (!text) {
        for (const result of blockExecResults) {
            for (const extrinsic of blockExecExtrinsic) {
                input = './block-exec/' + extrinsic + '-' + result + '.csv';
                try {
                    file = await d3.text(input);
                    // append metadata to csv
                    file = file.split("\n").join("," + extrinsic + "," + result + "\n");
                    text += file;
                } catch (e) {
                    document.getElementById('charts').innerText = e;
                    return;
                }
            }
        }
    }

    var headers = ["info", "function", "time", "extrinsic", "tx_per_block"].join(",");
    let csv = await d3.csvParse(headers + "\n" + text);

    let split_data = splitData(csv);

    createCharts(split_data);
}

function splitData(data) {
    let split_data = {};

    for (const item of data) {
        if (!(item.extrinsic in split_data)) {
            split_data[item.extrinsic] = {
                x: [],
                y: []
            };
        }
        split_data[item.extrinsic].x.push(item.tx_per_block);
        // ns to ms
        split_data[item.extrinsic].y.push(item.time / 1000000);
    }

    return split_data;
}

function createCharts(split_data) {

    let keys = Object.keys(split_data);

    var counter = 0;
    for (const key of keys) {

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
