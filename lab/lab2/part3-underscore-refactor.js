(function(){

  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  /* =====================

  # Lab 2, Part 3

  ## Introduction

    You've already seen this file organized and refactored. In this lab, you will
    try to refactor this code to be cleaner and clearer - you should use the
    utilities and functions provided by underscore.js. Eliminate loops where possible.

  ===================== */

  // Mock user input
  // Filter out according to these zip codes:
  var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  var minEnrollment = 300;


  // Clean data
  // Clean ZIPCODE field (prepare for filtering)
  var splitZipcode = function(dataEntry){
    if(_.isString(dataEntry.ZIPCODE)){
        // If we have '19104 - 1234', splitting and taking the first (0th) element
        // as an integer should yield a zip in the format above
        split = dataEntry.ZIPCODE.split(' ');
        normalized_zip = parseInt(split[0]);
        dataEntry.ZIPCODE = normalized_zip;
    }
  }
  

  // Check if a school is a kindergarten
  var isKindergarten = function(dataEntry){
    if (_.isNumber(dataEntry.GRADE_LEVEL)){
      return(dataEntry.GRADE_LEVEL < 1);
    } else {
      return(dataEntry.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0);
    }
  }


  // Check if a school is a elementary school
  var isElementary = function(dataEntry){
    if (_.isNumber(dataEntry.GRADE_LEVEL)){
      return(dataEntry.GRADE_LEVEL >= 1 & dataEntry.GRADE_LEVEL < 6);
    } else {
      return(dataEntry.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0);
    }
  }


  // Check if a school is a middle school
  var isMiddle = function(dataEntry){
    if (_.isNumber(dataEntry.GRADE_LEVEL)){
      return(dataEntry.GRADE_LEVEL >= 6 & dataEntry.GRADE_LEVEL < 9);
    } else {
      return(dataEntry.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0);
    }
  }


  // Check if a school is a high school
  var isHighS = function(dataEntry){
    if (_.isNumber(dataEntry.GRADE_LEVEL)){
      return(dataEntry.GRADE_LEVEL >= 9);
    } else {
      return(dataEntry.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0);
    }
  }
  

  // Check if a school is open
  var isOpen = function(dataEntry){
    return(dataEntry.ACTIVE.toUpperCase() === 'OPEN');
  }


  // Check if a school is a public school
  var isPublic = function(dataEntry){
    return(dataEntry.TYPE.toUpperCase() !== 'CHARTER' & dataEntry.TYPE.toUpperCase() !== 'PRIVATE');
  }


  // Check if a data entry from the phillySchools dataset is a school
  var isSchool = function(dataEntry){
    return( isKindergarten(dataEntry) | isElementary(dataEntry) | isMiddle(dataEntry) | isHighS(dataEntry) );
  }


  // Check if a school meets the minimum enrollment requirement (300)
  var meetsMinimumEnrollment = function(dataEntry){
    return(dataEntry.ENROLLMENT > minEnrollment)
  }


  // Check if a school meets the zipcode requirement ([19106, 19107, 19124, 19111, 19118])
  var meetsZipCondition = function(dataEntry){
    return(acceptedZipcodes.indexOf(dataEntry.ZIPCODE) >= 0);
  }


  // Check if a school meets all requirement for this assignment
  var meetsAll = function(dataEntry){
    return(isOpen(dataEntry) & isSchool(dataEntry) & meetsMinimumEnrollment(dataEntry) & meetsZipCondition(dataEntry))
  }


  // Filter data 
  var filtered_data = [];
  var filtered_out = [];
  _.each(schools, function(dataEntry){
    if(meetsAll(dataEntry)){
      filtered_data.push(dataEntry);
    } else {
      filtered_out.push(dataEntry);
    }
  })
  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);


  // Map styling
  var mapStyling = function(filteredDataEntry){
  // Constructing the styling options for our map
    if (isHighS(filteredDataEntry)){
      color = '#0000FF';
    } else if (isMiddle(filteredDataEntry)) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    // The style options
    var pathOpts = {'radius': filteredDataEntry.ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([filteredDataEntry.Y, filteredDataEntry.X], pathOpts)
      .bindPopup(filteredDataEntry.FACILNAME_LABEL)
      .addTo(map);
  }


  // Map qualified data out 
  _.each(filtered_data, function(data){mapStyling(data)});


})();
