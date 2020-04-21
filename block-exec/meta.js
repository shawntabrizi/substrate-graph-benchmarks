let blockExecResults = [];

for (let i = 0; i < 10; i++) {
    blockExecResults.push("000" + i);
    blockExecResults.push("00" + i + "0");
    blockExecResults.push("0" + i + "00");
    blockExecResults.push("1" + i + "00");
}

blockExecResults.push("2000");

blockExecResults.sort()
