// (function(){

//   var map = L.map('map', {
//     center: [39.9522, -75.1639],
//     zoom: 14
//   });
//   var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
//     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     subdomains: 'abcd',
//     minZoom: 0,
//     maxZoom: 20,
//     ext: 'png'
//   }).addTo(map);

//   /* =====================
//   # Lab 2, Part 3
//   ## Introduction
//     You've already seen this file organized and refactored. In this lab, you will
//     try to refactor this code to be cleaner and clearer - you should use the
//     utilities and functions provided by underscore.js. Eliminate loops where possible.
//   ===================== */

//   // Mock user input
//   // Filter out according to these zip codes:
//   var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
//   // Filter according to enrollment that is greater than this variable:
//   var minEnrollment = 300;


//   // clean data
//   for (var i = 0; i < schools.length - 1; i++) {
//     // If we have '19104 - 1234', splitting and taking the first (0th) element
//     // as an integer should yield a zip in the format above
//     if (typeof schools[i].ZIPCODE === 'string') {
//       split = schools[i].ZIPCODE.split(' ');
//       normalized_zip = parseInt(split[0]);
//       schools[i].ZIPCODE = normalized_zip;
//     }

//     // Check out the use of typeof here — this was not a contrived example.
//     // Someone actually messed up the data entry
//     if (typeof schools[i].GRADE_ORG === 'number') {  // if number
//       schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL < 1;
//       schools[i].HAS_ELEMENTARY = 1 < schools[i].GRADE_LEVEL < 6;
//       schools[i].HAS_MIDDLE_SCHOOL = 5 < schools[i].GRADE_LEVEL < 9;
//       schools[i].HAS_HIGH_SCHOOL = 8 < schools[i].GRADE_LEVEL < 13;
//     } else {  // otherwise (in case of string)
//       schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
//       schools[i].HAS_ELEMENTARY = schools[i].GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
//       schools[i].HAS_MIDDLE_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
//       schools[i].HAS_HIGH_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
//     }
//   }

//   // filter data
//   var filtered_data = [];
//   var filtered_out = [];
//   for (var i = 0; i < schools.length - 1; i++) {
//     isOpen = schools[i].ACTIVE.toUpperCase() == 'OPEN';
//     isPublic = (schools[i].TYPE.toUpperCase() !== 'CHARTER' ||
//                 schools[i].TYPE.toUpperCase() !== 'PRIVATE');
//     isSchool = (schools[i].HAS_KINDERGARTEN ||
//                 schools[i].HAS_ELEMENTARY ||
//                 schools[i].HAS_MIDDLE_SCHOOL ||
//                 schools[i].HAS_HIGH_SCHOOL);
//     meetsMinimumEnrollment = schools[i].ENROLLMENT > minEnrollment;
//     meetsZipCondition = acceptedZipcodes.indexOf(schools[i].ZIPCODE) >= 0;
//     filter_condition = (isOpen &&
//                         isSchool &&
//                         meetsMinimumEnrollment &&
//                         !meetsZipCondition);

//     if (filter_condition) {
//       filtered_data.push(schools[i]);
//     } else {
//       filtered_out.push(schools[i]);
//     }
//   }
//   console.log('Included:', filtered_data.length);
//   console.log('Excluded:', filtered_out.length);

//   // main loop
//   var color;
//   for (var i = 0; i < filtered_data.length - 1; i++) {
//     isOpen = filtered_data[i].ACTIVE.toUpperCase() == 'OPEN';
//     isPublic = (filtered_data[i].TYPE.toUpperCase() !== 'CHARTER' ||
//                 filtered_data[i].TYPE.toUpperCase() !== 'PRIVATE');
//     meetsMinimumEnrollment = filtered_data[i].ENROLLMENT > minEnrollment;

//     // Constructing the styling  options for our map
//     if (filtered_data[i].HAS_HIGH_SCHOOL){
//       color = '#0000FF';
//     } else if (filtered_data[i].HAS_MIDDLE_SCHOOL) {
//       color = '#00FF00';
//     } else {
//       color = '##FF0000';
//     }
//     // The style options
//     var pathOpts = {'radius': filtered_data[i].ENROLLMENT / 30,
//                     'fillColor': color};
//     L.circleMarker([filtered_data[i].Y, filtered_data[i].X], pathOpts)
//       .bindPopup(filtered_data[i].FACILNAME_LABEL)
//       .addTo(map);
//   }

// })();

// refractored
(function(){

  let map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  let Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
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
  let acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  let minEnrollment = 300;

  let normalizeZip = (school) => {
    if (typeof school.ZIPCODE === 'string') {
      split = school.ZIPCODE.split(' ');
      normalized_zip = parseInt(split[0]);
      school.ZIPCODE = normalized_zip;
    }
    return school;
  }
  
  let hasK = (school) => {
    if (typeof school.GRADE_ORG === 'number') {  // if number
      school.HAS_KINDERGARTEN = school.GRADE_LEVEL < 1;
    } else {  // otherwise (in case of string)
      school.HAS_KINDERGARTEN = school.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
    }  
    return school;  
  }

  let hasElem = (school) => {
    if (typeof school.GRADE_ORG === 'number') {  // if number
      school.HAS_ELEMENTARY = 1 < school.GRADE_LEVEL < 6;
    } else {  // otherwise (in case of string)
      school.HAS_ELEMENTARY = school.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
    }
    return school;
  }

  let hasMid = (school) => {
    if (typeof school.GRADE_ORG === 'number') {  // if number
      school.HAS_MIDDLE_SCHOOL = 5 < school.GRADE_LEVEL < 9;
    } else {  // otherwise (in case of string)
      school.HAS_MIDDLE_SCHOOL = school.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;      
    }
    return school;
  }

  let hasHigh = (school) => {
    if (typeof school.GRADE_ORG === 'number') {  // if number
      school.HAS_HIGH_SCHOOL = 8 < school.GRADE_LEVEL < 13;
    } else {  // otherwise (in case of string)
      school.HAS_HIGH_SCHOOL = school.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
    return school;
  }

  let clean = (lst) => {
    lst = _.map(lst, normalizeZip);
    lst = _.map(lst, hasK);
    lst = _.map(lst, hasElem);
    lst = _.map(lst, hasMid);
    lst = _.map(lst, hasHigh);
    return lst;
  }

  schools = clean(schools);

  // filter data

  let isOpen = (school) => {
    return school.ACTIVE.toUpperCase() == 'OPEN';
  }

  let isPublic = (school) => {
    return (school.TYPE.toUpperCase() !== 'CHARTER' ||
            school.TYPE.toUpperCase() !== 'PRIVATE');
  } 

  let isSchool = (school) => {
    return (school.HAS_KINDERGARTEN ||
            school.HAS_ELEMENTARY ||
            school.HAS_MIDDLE_SCHOOL ||
            school.HAS_HIGH_SCHOOL);
  }

  let meetsMinimumEnrollment = (school, minEnroll) => {
    return school.ENROLLMENT > minEnroll;
  }

  let meetsZipCondition = (school, accpZips) => {
    return accpZips.indexOf(school.ZIPCODE) >= 0;
  }

  let filterSchools = (schools, accpZips, minEnroll) => {
    let grouped = _.groupBy(schools, function(school) {
      filter_condition = (isOpen(school) &&
                          isSchool(school) &&
                          meetsMinimumEnrollment(school, minEnroll) &&
                          !meetsZipCondition(school, accpZips));
      return filter_condition? 'included' : 'excluded';
    })
    return [grouped['included'], grouped['excluded']];
  }

  let [filtered_data, filtered_out] = filterSchools(schools, acceptedZipcodes, minEnrollment);

  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // main loop
  let color;
  let assignColor = (school) => {
    let color;
    if (school.HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (school.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    return color;  
  }

  let makeCircle = (school, lmap) => {
    let pathOpts = {'radius': school.ENROLLMENT / 30,
                    'fillColor': assignColor(school)};
    L.circleMarker([school.Y, school.X], pathOpts)
      .bindPopup(school.FACILNAME_LABEL)
      .addTo(lmap);
  }
  _.map(schools, s => makeCircle(s, map));

})();
