var versionNum = "0.1.0";
var mapURL = "http://premium.accuweather.com/nx_mosaic_640x480c/re/inmare";
// var mapURL = "http://sirocco.accuweather.com/nx_mosaic_640x480_public/sir/inmasir";

function setup() {
  gDoneButton = new AppleGlassButton(document.getElementById("doneButton"), "Done", hidePrefs);
  gInfoButton = new AppleInfoButton(document.getElementById("infoButton"), document.getElementById("front"), "white", "white", showPrefs);

  widget.onshow = refreshMap();

  if (undefined === widget.preferenceForKey("currentLocation")){
    showPrefs();
  }

  showPrefs();
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
  document.getElementById('selected_region').value = widget.preferenceForKey("region");
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
