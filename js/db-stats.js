async function parseData(pallet, extrinsic, text) {
    // Benchmark data is in *.txt
    input = './data/' + pallet + "_" + extrinsic + ".log";

    document.getElementById('dashboard-title').innerText = input;
    document.getElementById('raw-data-link').href = input;

    if (!text) {
        try {
            text = await d3.text(input);
        } catch (e) {
            document.getElementById('charts').innerText = e;
            return;
        }
    }

    var ssv = d3.dsvFormat(" ");

    // Rough format of the substrate logs
    var headers = ["date", "time", "main", "type", "topic", "", "status", "operation", "value", "component_value"].join(" ");
    let logs = await ssv.parse(headers + "\n" + text);

    let all_data = [];

    // Parse all the logs
    for (let i = 0; i < logs.length; i++) {
        if (logs[i].status.toUpperCase() == "START") {
            // Skip start line
            i++;

            // What we use for tracking data
            let get_tracker = {};
            let put_tracker = {};
            let counter = {
                read: 0,
                readRepeat: 0,
                write: 0,
                writeRepeat: 0
            };
            let table = [];
            let uid = 1;

            // Populate `get_tracker` and `put_tracker` with whitelist
            for (item of whitelist) {
                if (!(item.read || item.write)) { continue; }
                if (item.read) {
                    get_tracker[item.key.substr(2)] = uid;
                }
                if (item.write) {
                    put_tracker[item.key.substr(2)] = uid;
                }
                uid++;
            }

            while (logs[i].status.toUpperCase() != "END") {
                let line = logs[i];

                let [key, value] = line.value.split("=");
                let length = 0;
                if (value != "None") {
                    // `Some()` is 6 characters, divide by 2 for bytes
                    length = (value.length - 6) / 2;
                }

                let knownKeyFound = "";
                for (knownKey of knownKeys) {
                    if (key.includes(knownKey.key.substr(2))) {
                        knownKeyFound = knownKey.name;
                        break;
                    }
                }

                let table_row = {
                    uid: uid,
                    operation: "",
                    knownKey: knownKeyFound,
                    length: length,
                    key: key,
                    value: value,
                };

                if (line.operation.toUpperCase() == "GET") {
                    // Is this the first time we are seeing this value
                    if (!get_tracker[key]) {
                        // Track it
                        get_tracker[key] = uid;
                        table_row.operation = "Read";
                        counter.read++;
                        uid++;
                    } else {
                        table_row.operation = "Repeat Read";
                        // Get existing uid
                        table_row.uid = get_tracker[key];
                        counter.readRepeat++;
                    }
                } else if (line.operation.toUpperCase() == "PUT") {
                    // Is this the first time we are seeing this value
                    if (!put_tracker[key]) {
                        // Track it
                        put_tracker[key] = uid;
                        // Note our first write also counts as our first read
                        get_tracker[key] = uid;
                        table_row.operation = "Write";
                        counter.write++;
                        uid++;
                    } else {
                        table_row.operation = "Repeat Write";
                        // Get existing uid from `get_tracker`
                        table_row.uid = put_tracker[key];
                        counter.writeRepeat++;
                    }
                } else {
                    console.error("Unrecognized Operation: ", line.operation)
                }
                table.push(table_row);
                i++;
            }
            // Add data from start to end
            all_data.push({
                counter: counter,
                table: table,
                uid: uid
            });
        }
    }
    createCounterTable(all_data[0].counter);
    createRawTable(all_data[0].table, all_data[0].uid);
    createCharts(all_data);
}

function createCounterTable(data) {
    let table = document.getElementById('db-count');

    // Clear table
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    let keys = Object.keys(data)

    let tr = document.createElement('tr');
    for (key of keys) {
        let th = document.createElement('th');
        th.innerText = key;

        tr.appendChild(th);
    }
    let tr2 = document.createElement('tr');
    for (key of keys) {
        let td = document.createElement('td');
        td.innerText = data[key];
        tr2.appendChild(td);
    }

    tbody.appendChild(tr2);
    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
}

function createRawTable(data, uid_max) {
    let table = document.getElementById('raw-data');

    // Clear table
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    if (data.length == 0) { return; }

    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    let keys = Object.keys(data[0])

    let tr = document.createElement('tr');
    for (key of keys) {
        let th = document.createElement('th');
        th.innerText = key;

        tr.appendChild(th);
    }

    for (row of data) {
        let tr2 = document.createElement('tr');
        for (key of keys) {
            let td = document.createElement('td');
            if (key == "uid") {
                td.style.backgroundColor = getColorAtScalar(row.uid, uid_max);
            }
            td.innerText = row[key];
            tr2.appendChild(td);
        }
        tbody.appendChild(tr2);
    }

    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
}

var getColorAtScalar = function(n, maxLength) {
    var hue = (n * 300) / maxLength;
    let color = 'hsl(' + hue + ',100%,75%)';
    return color;
}

function combineData(all_data, data_key) {
    if (all_data.length == 0) { return; }
    let keys = Object.keys(all_data[0][data_key]);

    let combined = {};
    for (key of keys) {
        combined[key] = [];
        for (data of all_data) {
            combined[key].push(data[data_key][key])
        }
    }

    return combined;
}

function createCharts(all_data) {
    var counter = 0;
    let combined = combineData(all_data, "counter");

    let keys = Object.keys(combined);

    let chart = [];
    for (key of keys) {
        var trace = {
            x: [...Array(combined[key].length).keys()],
            y: combined[key],
            mode: 'markers',
            type: 'scatter',
            name: key,
        };
        chart.push(trace);
    }


    var layout = {
        title: {
            text: "DB Operations per Extrinsic"
        },
        xaxis: {
            title: {
                text: "Run # (click on data to update table)"
            }
        },
        yaxis: {
            title: {
                text: 'Number of Operations'
            }
        }
    };

    let chartDiv = document.createElement('div');
    chartDiv.id = 'myChart' + counter;
    chartDiv.classList.add('my-4', 'w-100', 'chart');

    document.getElementById('charts').appendChild(chartDiv);

    Plotly.newPlot('myChart' + counter, chart, layout);

    // Populate table with data from selected point
    chartDiv.on('plotly_click', function(data) {
        let index = data.points[0].x;
        createCounterTable(all_data[index].counter);
        createRawTable(all_data[index].table, all_data[index].uid);
    });
}

document.getElementById("paste-raw").addEventListener("input", async function(event) {
    let input = event.target.value;
    parseData("", "", input);
});
