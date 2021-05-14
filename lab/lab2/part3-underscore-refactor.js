(function (){

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

 
  // Get data and set data 

  function getX(school){
    return school.X;
  }

  function getY(school){
    return school.Y;
  }

  function getZip(school){
    return school.ZIPCODE;
  } 
  function SetZip(school, data){
    school.ZIPCODE = data;
  }

  function getGradeOrg(school){
    return school.GRADE_ORG;
  }

  function getGradeLevel(school){
    return school.GRADE_LEVEL;
  }

  function getActive(school){
    return school.ACTIVE;
  }

  function getType(school){
    return school.TYPE;
  }

  function getEnroll(school){
    return school.ENROLLMENT;
  }

  function getLabel(school){
    return school.FACILNAME_LABEL;
  }

  // clean data
  // If we have '19104 - 1234', splitting and taking the first (0th) element
  // as an integer should yield a zip in the format above

  function normalizedZip(school){
    if (_.isString(getZip(school))) {
      split = getZip(school).split(' ');
      normalized_zip = parseInt(split[0]);
      SetZip(school, normalized_zip);    
    }
  }

  // Determine whether it's a kindergarten
  function isKindergarten(school){
    if (_.isNumber(getGradeOrg(school))){
      return getGradeLevel(school) < 1;
    } else{
      return getGradeLevel(school).toUpperCase().indexOf('K') >= 0;
    }
  }

// Determine whether it's a elementry school
  function isElementry(school){
    if (_.isNumber(getGradeOrg(school))){
      return 1 < getGradeLevel(school) < 6;
    } else{
      return getGradeLevel(school).toUpperCase().indexOf('ELEM') >= 0;
    }
  }

  // Determine whether it's a middle school
  function isMiddle(school){
    if (_.isNumber(getGradeOrg(school))){
      return 5 < getGradeLevel(school) < 9;
    } else{
      return getGradeLevel(school).toUpperCase().indexOf('MID') >= 0;
    }
  }

  // Determine whether it's a high school
  function isHigh(school){
    if (_.isNumber(getGradeOrg(school))){
      return 8 < getGradeLevel(school) < 13;
    } else{
      return getGradeLevel(school).toUpperCase().indexOf('HIGH') >= 0;
    }
  }
  
  // Check if the school is open
  function isOpen(school){
    return getActive(school).toUpperCase() == "OPEN";
  } 

  // Check if the school is public
  function isPublic(school){
    return (getType(school).toUpperCase() !== 'CHARTER' || 
            getType(school).toUpperCase() !== 'PRIVATE');
  } 

  // Check if it's a school
  function isSchool(school){
    return (isKindergarten(school) || 
            isElementry(school) ||
            isMiddle(school) ||
            isHigh(school));
  }

  // Check if it meets minimum enrollment
  function meetsMinimumEnrollment(school){
    return getEnroll(school) > minEnrollment;
  }

  // Check if it meets zipcode condition
  function meetsZipCondition(school){
    return acceptedZipcodes.indexOf(normalizedZip(school)) >= 0;
  }

  // To filter out needed schools
  function toFilter(school){    
    return (isOpen(school) &&
            isSchool(school) &&
            meetsMinimumEnrollment(school) &&
            !meetsZipCondition(school))
  }

  // To clean data
  schools = _.each(schools, normalizedZip);
  console.log(schools);

  // TO filter data
  var filtered_data = _.filter(schools, toFilter);
  var filtered_out = _.reject(schools, toFilter);

  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);


  // To set color to each school
  function changeColor(school){
    if (isHigh(school)){
      return '#0000FF';
    } else if (isMiddle(school)){
      return '#00FF00';
    } else {
      return '##FF0000';
    }
  }

  // To add the school to the map
  function circle(school, tmap){
    var pathOpts = {'radius': getEnroll(school) / 30,
                      'fillColor': changeColor(school)};
      L.circleMarker([getY(school), getX(school)], pathOpts)
        .bindPopup(getLabel(school))
        .addTo(tmap);
  }

  _.map(filtered_data, function(school){circle(school,map);});

})();
