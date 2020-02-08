// On load, check if querystrings are present
window.onload = async function() {
  if (window.location.hash) {
    parseCsv('./pallet-identity/' + window.location.hash.substring(1) + '.txt');
  }
};
