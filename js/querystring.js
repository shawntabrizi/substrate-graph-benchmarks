// Detect Querystrings
function parseQueryStrings() {
    var queryStrings = {};
    //Parse URL
    var url = window.location.search.substring(1);
    if (url) {
        //split querystrings
        var pairs = url.split('&');
        for (pair in pairs) {
            pairArray = pairs[pair].split('=');
            queryStrings[pairArray[0]] = pairArray[1];
        }
    }

    return queryStrings;
}

// On load, check if querystrings are present
window.addEventListener('load', async function() {
    var queryStrings = parseQueryStrings();

    if (queryStrings['p'] && queryStrings['e']) {
        parseData(queryStrings['p'], queryStrings['e']);
    }
});
