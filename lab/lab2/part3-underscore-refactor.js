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

  function isKinder (school) {
    if (typeof school.GRADE_ORG === 'number') {
      return school.GRADE_LEVEL < 1 
    } else {
      return school.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0
    }
  }

  function isElem (school) {
    if (typeof school.GRADE_ORG === 'number') {
      return 1< school.GRADE_LEVEL < 6
    } else {
      return school.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0
    }
  }

  function isMiddle (school) {
    if (typeof school.GRADE_ORG === 'number') {
      return 5 < school.GRADE_LEVEL < 9
    } else {
      return school.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0
    }
  }

  function isHigh (school) {
    if (typeof school.GRADE_ORG === 'number') {
      return 8 < school.GRADE_LEVEL < 13
    } else {
      return school.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0
    }
  }

  function getZIP (school) {
    if (typeof school.ZIPCODE === 'string') {
      split = school.ZIPCODE.split(' ');
      normalized_zip = parseInt(split[0]);
      school.ZIPCODE = normalized_zip;
    }
  }
  // If we have '19104 - 1234', splitting and taking the first (0th) element
    // as an integer should yield a zip in the format above

  // clean data
  schools.map (getZIP)
  
  function isSchool (data) {
    return isKinder (data) || isElem (data) || isMiddle (data) || isHigh (data)
  }
 
  function filter_condition (data) {
    return data.ACTIVE.toUpperCase() == 'OPEN' && isSchool (data) && data.ENROLLMENT > minEnrollment && !(acceptedZipcodes.indexOf(data.ZIPCODE) >= 0)
  }

  // filter data
  filtered_data = schools.filter(filter_condition)
  filtered_out = _.difference(schools,filtered_data)
  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  function isPublic (data) {
    return data.TYPE.toUpperCase() !== 'CHARTER' && data.TYPE.toUpperCase() !== 'PRIVATE'
  }

  function styler (filtered) {
    // Constructing the styling  options for our map
    if (filtered.HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (filtered.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    // The style options
    var pathOpts = {'radius': filtered.ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([filtered.Y, filtered.X], pathOpts)
      .bindPopup(filtered.FACILNAME_LABEL)
      .addTo(map);
  }

  // main loop
  var color;
  (filtered_data.filter(isPublic)).map(styler)

})();
