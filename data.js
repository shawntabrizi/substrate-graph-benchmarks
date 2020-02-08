async function parseCsv(input) {
  let text = await d3.text(input);

  let charts = document.getElementsByClassName('chart');

  for (chart of charts) {
    // Clear charts
    while (chart.firstChild) {
      chart.removeChild(chart.firstChild);
    }
  }

  // Seperate the first row which is metadata
  let metadata = text
    .split('\n')[0]
    .replace(/[",]/g, '')
    .split(' ');

  console.log(metadata);

  document.getElementById('dashboard-title').innerText = metadata.join(' ');

  let repeat = parseInt(metadata[7]);

  // The actual CSV data
  let data = text
    .split('\n')
    .slice(1)
    .join('\n');

  let csv = await d3.csvParse(data);

  createTable(csv);

  let split_data = splitBenchmarks(csv, repeat);

  let keys = Object.keys(split_data);

  createCharts(split_data, keys, metadata);
}

async function createTable(data) {
  let json = await d3.json('./pallet-identity/meta.json');

  let keys = Object.keys(data[0]);

  let table = document.getElementById('raw-data');

  // Clear table
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  let tr = document.createElement('tr');
  for (key of keys) {
    let th = document.createElement('th');
    th.innerText = key + ' (' + json['components'][key] + ')';

    tr.appendChild(th);
  }

  for (row of data) {
    let tr2 = document.createElement('tr');
    for (key of keys) {
      let td = document.createElement('td');
      td.innerText = row[key];
      tr2.appendChild(td);
    }
    tbody.appendChild(tr2);
  }

  thead.appendChild(tr);
  table.appendChild(thead);
  table.appendChild(tbody);
}

function splitBenchmarks(data, repeat) {
  let keys = Object.keys(data[0]);
  // Remove the time object
  keys.pop();

  let split_data = {};
  for (key of keys) {
    split_data[key] = [];
  }

  for (let i = 0; i < data.length; i += repeat) {
    for (key of keys) {
      if (data[i + repeat]) {
        if (data[i][key] != data[i + repeat][key]) {
          split_data[key] = split_data[key].concat(data.slice(i, i + repeat));
          break;
        }
      }
    }
  }

  return split_data;
}

function createCharts(split_data, keys, metadata) {
  let extrinsic = metadata[3];

  var counter = 0;
  for (key of keys) {
    counter += 1;

    let data = split_data[key];

    let x = data.map(row => {
      return row[key];
    });
    let time = data.map(row => {
      return row['time'] / 1000000;
    });

    var trace1 = {
      x: x,
      y: time,
      mode: 'markers',
      type: 'scatter',
      name: key
    };

    let fixed_data = keys
      .filter(x => {
        return x != key;
      })
      .map(x => {
        return x + ': ' + data[0][x];
      })
      .join(', ');

    if (fixed_data) {
      fixed_data = ' (' + fixed_data + ')';
    }

    var layout = {
      title: {
        text: extrinsic + ' over ' + key + fixed_data
      },
      xaxis: {
        title: {
          text: key
        }
      },
      yaxis: {
        title: {
          text: 'Time (ms)'
        }
      }
    };

    var chart = [trace1];

    Plotly.newPlot('myChart' + counter, chart, layout);
  }
}
