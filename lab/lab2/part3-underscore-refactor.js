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

  //define function
  var formatZipcodes = function (school){
    if (typeof school.ZIPCODE === 'string'){
      split = school.ZIPCODE.split(' ');
      school.ZIPCODE = parseInt(split[0]);
    }
  }

  var isKinder = function(school) {
    if(typeof school.GRADE_ORG === 'number') {  
      return school.GRADE_LEVEL < 1;
    } else {
      return school.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
    }
  }

  var isElem = function(school) {
    if(typeof school.GRADE_ORG === 'number') {  
      return 1 < school.GRADE_LEVEL < 6;
    } else {
      return school.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
    }
  }

  var isMid = function(school) {
    if(typeof school.GRADE_ORG === 'number') {  
      return 5 < school.GRADE_LEVEL < 9;
    } else {
      return school.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
    }
  }

  var isHigh = function(school) {
    if(typeof school.GRADE_ORG === 'number') {  
      return 8 < school.GRADE_LEVEL < 13;
    } else {
      return school.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
  }

  var isOpen = function(school){
    return school.ACTIVE.toUpperCase() == 'OPEN';
  }

  var isPublic = function(school){
    return (school.TYPE.toUpperCase() !== 'CHARTER' || school.TYPE.toUpperCase() !== 'PRIVATE');
  }

  var isSchool = function(school){
    return isKinder(school) || isElem(school) || isMid(school) || isHigh(school);
  }

  var meetsMinimumEnrollment = function(school){
    return school.ENROLLMENT > minEnrollment;
  } 

  var meetsZipCondition = function(school){
    return acceptedZipcodes.indexOf(school.ZIPCODE) >= 0;
  }

  var filter_condition = function(school){
    return isOpen(school) && isSchool(school) && meetsMinimumEnrollment(school) && !meetsZipCondition(school);
  }

  // clean and fliter data
  schools = _.each(schools,formatZipcodes);
  console.log(schools);

  var filtered_data = [];
  filtered_data = _.filter(schools,filter_condition);
  console.log(filtered_data);

  // add marker to the map
  var color;
  var styling = function(school){
    if (isHigh(school)){
      color = '#0000FF';
    } else if (isMid(school)) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    return color;
  }

  var drawcircle = function(school, fmap){
    var pathOpts = {'radius': school.ENROLLMENT / 30,
    'fillColor': styling(school)};
    L.circleMarker([school.Y, school.X], pathOpts)
    .bindPopup(school.FACILNAME_LABEL)
    .addTo(fmap);
  }

  _.map(filtered_data, function(school){drawcircle(school,map);})

})();
