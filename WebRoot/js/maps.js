  // styles 
  function getMapStyles(){
    // colors 
    var color_land_bg = '#bfc2c7';
    var color_province_lines = '#b1b1b1';
    var color_province_text = '#a1a1a1';
    var color_text = '#3c363d';
    var color_water = '#d9e9f2'


    var styles = [
      {
        featureType: "road",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "transit",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "poi",
        stylers: [
          { color: color_land_bg }
        ]
      },{
        featureType: "landscape",
        stylers: [
          { color: color_land_bg }
        ]
      },{
        featureType: "administrative",
        stylers: [
          { weight: 0.01 },
          { color: color_text }
        ]
      },{
        featureType: "water",
        stylers: [
          { color: color_water }
        ]
      },{
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          { color: color_land_bg }
        ]
      },{
        featureType: "administrative.province",
        stylers: [
          { weight: 1.8 },
          { color: color_province_lines }
        ]
      },{
        featureType: "administrative.province",
        elementType: "labels.text",
        stylers: [
          { weight: 0.01 },
          { color: color_province_text }
        ]
      }
    ];
    return styles;
  }
  
  // OPTIONS ********
  // ----------------
  function getMapOptions(lat, lng) {

    var myOptions = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 6,
      disableDefaultUI: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: getMapStyles()
    };
    return myOptions;
  }
  
  // INITIALIZE
  function initialize() {
    document.map = new google.maps.Map(document.getElementById("map_canvas"), getMapOptions('-34.397', '150.644'));
  }

  // RESOLVE ADDRESS *******
  // -----------------------
  function GetLocationGeometry(address) { 
    var geocoder = new google.maps.Geocoder();
    if (geocoder) {
      geocoder.geocode({ 'address': address }, function (results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
            var g = results[0].geometry;
            SetMapAddress(g);

            console.log('LatLang: ' + g.location.lat() + ' : ' + g.location.lng())
         }
         else {
            console.log("Geocoding failed: " + status);
         }
      });
    }
  } 

  function RequestMapAddress(address) {
    GetLocationGeometry(address);
  }

  function SetMapAddress(g) {
   if (g != null) {
      var loc = g.location;
      document.map.setCenter(new google.maps.LatLng(loc.lat(),loc.lng(), 13));
      document.map.fitBounds(g.viewport); // geometry.bounds is optionally returned. 
   }
   $('#searchfield').focus();
  }
  // MARKERS
