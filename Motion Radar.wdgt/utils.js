// Utility functions
//*******************************

function refreshMap(){
  var map = document.getElementById("map");
  var currentLocation = widget.preferenceForKey("currentLocation");
  var map_type = widget.preferenceForKey("map_type");

  if(map_type === null){ map_type = "sir"; }

  // Update the map
  map.src=mapURL[map_type] + currentLocation + ".gif";
  alert("New map URL: " + map.src);
}


function onhide(){
  alert("Hiding widget");
}


function updatePrefs(pref){
  if( pref == "map_type") {
    // Get the type of map the user want's to see
    var map_type_id = document.getElementById('selected_map_type');
    var map_type = map_type_id.options[map_type_id.selectedIndex].value;
    widget.setPreferenceForKey(map_type,"map_type");

  } else if( pref == "zip_code") {
    // Set the location of the user
    var state_suffix = "_";
    var zip_code = document.getElementById('zip_code_region').value;
    widget.setPreferenceForKey(zip_code,"zip_code");

    // Lookup the STATE abbreviation using the Zip Code
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