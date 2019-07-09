function buildMetadata() {

    // @TODO: Complete the following function that builds the metadata panel
    let url = `/data`;
  
    // Use `d3.json` to fetch the metadata for a sample
    d3.json(url).then(function (response) {
        console.log(response);
      let panel = d3.select('#sample').html("");
  
      Object.entries(response).forEach(([key, value]) => {
        let cell = panel.append('p');
        cell.text(`${key}: ${value}`);
      })
    })
};

function buildLapData() {

  // @TODO: Complete the following function that builds the metadata panel
  let url = `/lap_data`;

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function (response) {
      console.log(response);
    let panel = d3.select('#lap').html("");

    Object.entries(response).forEach(([key, value]) => {
      let cell = panel.append('p');
      cell.text(`${key}: ${value}`);
    })
  })
};



function SetData(){
  var select = document.getElementById('raceId');
  var race_id = select.options[select.selectedIndex].value;
  document.myform.action = "/"+race_id;
  myform.submit();
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#raceId");

  // Use the list of sample names to populate the select options
  d3.json("/names" , function(err, sampleNames) {
    if (err) throw err;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
  });
}

function updateMap(){

  d3.json("/locations"+window.location.pathname , function(err, sampleNames) {
    // if (err) throw err;
    console.log("UpdateMap()")
    console.log(sampleNames)
    console.log("/locations"+window.location.pathname)
    console.log(sampleNames[0]["location"])
    var raceLoc = sampleNames[0]["location"]
    var country = sampleNames[0]["circuit_country"]
    var racename = sampleNames[0]["circuit_name"]
    var lat = raceLoc[0]
    var lng = raceLoc[1]
    var latlng = [lat, lng]

    var API_KEY = "pk.eyJ1IjoiYXVudGllYW5nZWxiIiwiYSI6ImNqd3ZnaDBtODBpcG4zeW4xbDdod3pyd3AifQ.ie-VKuEPmGLzQGCjsU5Q3Q"
  var myMap = L.map("map", {
  center: raceLoc,
  zoom: 2
  }); // myMap

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap); // Tile Layer

// This line should add a marker to the map for the race location
L.marker(raceLoc).addTo(myMap)



      }); // d3.json

  } // updateMap()

init()

console.log(window.location.pathname)
// SetData()
updateMap()