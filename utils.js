// Utility functions
//*******************************

function refreshMap(){
  var map = document.getElementById("map");
  var currentLocation = widget.preferenceForKey("currentLocation");

  // Update the map
  map.src=mapURL + currentLocation + ".gif";
}

function updatePrefs(pref){
  // Get the current location
  if( pref == "region") {
    var get_id = document.getElementById('selected_region');
    var region = get_id.options[get_id.selectedIndex].value;
    widget.setPreferenceForKey(region,"region");
    widget.setPreferenceForKey(region,"currentLocation");

  } else if( pref == "zip_code") {
    var state_suffix = "_";
    var zip_code = document.getElementById('zip_code_region').value;
    widget.setPreferenceForKey(zip_code,"zip_code");

    var client = new XMLHttpRequest();
    client.open("GET", "http://api.zippopotam.us/us/" + zip_code, true);
    client.onreadystatechange = function() {
      if(client.readyState == 4) {
        response = JSON.parse(client.responseText);
        var state = response["places"][0]["state abbreviation"];
        var latitude = response["places"][0]["latitude"];

        if( "CA" == state ){
          if(latitude < 36) { state_suffix = "N"; } else { state_suffix = "S"; }
        } else if( "FL" == state ){
          if(latitude > 26) { state_suffix = "_"; } else { state_suffix = "S"; }
        }

        var currentLocation = state + state_suffix;
        widget.setPreferenceForKey(currentLocation,"currentLocation");
      }
    };
    client.send();
  }
}