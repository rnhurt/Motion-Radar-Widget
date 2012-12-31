var versionNum = "0.1.1";
var mapURL = [];
mapURL["re"]  = "http://sirocco.accuweather.com/nx_mosaic_640x480c/re/inmare";
mapURL["sir"] = "http://sirocco.accuweather.com/nx_mosaic_640x480_public/sir/inmasir";
mapURL["rs"]  = "http://sirocco.accuweather.com/sat_mosaic_640x480_public/rs/isar";
mapURL["es"]  = "http://sirocco.accuweather.com/sat_mosaic_640x480_public/ei/isae";

function setup() {
  gDoneButton = new AppleGlassButton(document.getElementById("doneButton"), "Done", hidePrefs);
  gInfoButton = new AppleInfoButton(document.getElementById("infoButton"), document.getElementById("front"), "white", "white", showPrefs);

  if (window.widget) {
    widget.onhide = onhide;
    widget.onshow = refreshMap;

    // Set the default map type
    if (undefined === widget.preferenceForKey("map_type")){
      widget.setPreferenceForKey("sir","map_type");
    }

    // Make the user choose a zip code if they dont already have one
    if (undefined === widget.preferenceForKey("currentLocation")){
      showPrefs();
    }

    refreshMap();
  }
}

function showPrefs() {
  var front = document.getElementById("front");
  var back = document.getElementById("back");

  if (window.widget)
    widget.prepareForTransition("ToBack");

  front.style.display="none";
  back.style.display="block";

  if (window.widget)
    setTimeout ('widget.performTransition();', 0);

  // Set the default values for the preferences
  document.getElementById('zip_code_region').value = widget.preferenceForKey("zip_code");
  document.getElementById('selected_map_type').value = widget.preferenceForKey("map_type");

  // Set the version number
  document.getElementById('versionNum').innerHTML = versionNum;
}

function hidePrefs() {
  var front = document.getElementById("front");
  var back = document.getElementById("back");

  if (window.widget)
    widget.prepareForTransition("ToFront");

  back.style.display="none";
  front.style.display="block";

  if (window.widget)
    setTimeout ('widget.performTransition();', 0);

  refreshMap();
}
