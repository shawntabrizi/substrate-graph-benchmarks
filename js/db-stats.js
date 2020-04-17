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

    let component_metadata = await d3.json('./metadata.json');
    let all_metadata = {...component_metadata["common"], ...component_metadata[pallet] }

    // Rough format of the substrate logs
    var headers = ["date", "time", "main", "type", "topic", "", "status", "operation", "value", "component_value"].join(" ");
    let logs = await ssv.parse(headers + "\n" + text);

    let all_data = {};

    // Parse all the logs
    for (let i = 0; i < logs.length; i++) {
        if (logs[i].status.toUpperCase() == "START") {
            let component = logs[i].value;
            let component_value = logs[i].component_value;

            // Skip start line
            i++;

            // What we use for tracking data
            let get_tracker = {};
            let put_tracker = {};
            let clear_tracker = {};
            let counter = {
                read: 0,
                readRepeat: 0,
                write: 0,
                writeRepeat: 0,
                clear: 0,
                clearRepeat: 0,
            };
            let table = [];
            let uid = 1;

            // Populate `get_tracker` and `put_tracker` with whitelist
            for (item of whitelist) {
                if (!(item.read || item.write || item.clear)) { continue; }
                if (item.read) {
                    get_tracker[item.key.substr(2)] = uid;
                }
                if (item.write) {
                    put_tracker[item.key.substr(2)] = uid;
                }
                if (item.clear) {
                    clear_tracker[item.key.substr(2)] = uid;
                }
                uid++;
            }

            while (logs[i].status.toUpperCase() != "END") {
                let line = logs[i];

                // Skip any non-trace logs
                if (line.type != "TRACE") { continue; }

                let [key, value] = line.value.split("=");
                let length = 0;

                if (line.operation.toUpperCase() == "CLEARPREFIX") {
                    // Clear prefix has no data
                    length = 0;
                    value = null;
                } else if (value != "None") {
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
                        // Get existing uid
                        table_row.uid = put_tracker[key];
                        counter.writeRepeat++;
                    }
                } else if (line.operation.toUpperCase() == "CLEARPREFIX") {
                    // Is this the first time we are seeing this value
                    if (!clear_tracker[key]) {
                        // Track it
                        clear_tracker[key] = uid;
                        table_row.operation = "Clear Prefix";
                        counter.clear++;
                        uid++;
                    } else {
                        table_row.operation = "Repeat Clear Prefix";
                        // Get existing uid
                        table_row.uid = clear_tracker[key];
                        counter.clearRepeat++;
                    }
                } else {
                    console.error("Unrecognized Operation: ", line.operation)
                }
                table.push(table_row);
                i++;
            }
            // Add data from start to end
            if (!(component in all_data)) {
                all_data[component] = [];
            }
            all_data[component].push({
                counter: counter,
                table: table,
                uid: uid,
                component_value: component_value
            });
        }
    }
    // Initially populate with first data we have
    let first_data = all_data[Object.keys(all_data)[0]][0];
    createCounterTable(first_data.counter);
    createRawTable(first_data.table, first_data.uid);
    createCharts(all_data, all_metadata);
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
    let components = Object.keys(all_data);
    let combined = {};

    for (component of components) {
        if (all_data[component].length == 0) { continue; }

        let keys = Object.keys(all_data[component][0][data_key]);

        combined[component] = {};
        combined[component].component_values = [];

        // Generate the X axis
        for (data of all_data[component]) {
            combined[component].component_values.push(data.component_value);
        }

        // Generate Y axis stuff
        for (key of keys) {
            combined[component][key] = [];
            for (data of all_data[component]) {
                combined[component][key].push(data[data_key][key])
            }
        }
    }

    return combined;
}

function createCharts(all_data, metadata) {
    var counter = 0;
    let combined = combineData(all_data, "counter");

    let components = Object.keys(combined);

    for (component of components) {
        let keys = Object.keys(combined[component]);

        let chart = [];
        for (key of keys) {
            // Skip component value
            if (key == "component_values") { continue; }
            var trace = {
                x: combined[component].component_values,
                y: combined[component][key],
                mode: 'markers',
                type: 'scatter',
                name: key,
                customdata: component,
            };
            chart.push(trace);
        }

        let keyName = component + ' (' + metadata[component] + ')';

        var layout = {
            title: {
                text: "DB Operations per Extrinsic over " + keyName
            },
            xaxis: {
                title: {
                    text: keyName + "<br /><sub>Click Data to Update Table</sub>"
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
            // This is some custom metadata that tells us which component graph is clicked
            let selected_component = data.points[0].data.customdata;
            // This is the x axis data that was clicked
            let x_data = data.points[0].x;
            // This is the array index which has that x axis data for that component
            let index = all_data[selected_component].findIndex(element => element.component_value == x_data);
            // This is the final selected data
            let selected_data = all_data[selected_component][index];
            createCounterTable(selected_data.counter);
            createRawTable(selected_data.table, selected_data.uid);
        });
        counter += 1;
    }
}

document.getElementById("paste-raw").addEventListener("input", async function(event) {
    let input = event.target.value;
    parseData("", "", input);
});
