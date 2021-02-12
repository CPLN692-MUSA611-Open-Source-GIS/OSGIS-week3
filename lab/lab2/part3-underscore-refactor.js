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

 
  // clean data

  
  // for (var i = 0; i < schools.length - 1; i++) {
  //   // If we have '19104 - 1234', splitting and taking the first (0th) element
  //   // as an integer should yield a zip in the format above
  //   if (typeof schools[i].ZIPCODE === 'string') {
  //     split = schools[i].ZIPCODE.split(' ');
  //     normalized_zip = parseInt(split[0]);
  //     schools[i].ZIPCODE = normalized_zip;
  //   }
  


  //   // Check out the use of typeof here — this was not a contrived example.
  //   // Someone actually messed up the data entry
  //   if (typeof schools[i].GRADE_ORG === 'number') {  // if number
  //     schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL < 1;
  //     schools[i].HAS_ELEMENTARY = 1 < schools[i].GRADE_LEVEL < 6;
  //     schools[i].HAS_MIDDLE_SCHOOL = 5 < schools[i].GRADE_LEVEL < 9;
  //     schools[i].HAS_HIGH_SCHOOL = 8 < schools[i].GRADE_LEVEL < 13;
  //   } else {  // otherwise (in case of string)
  //     schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
  //     schools[i].HAS_ELEMENTARY = schools[i].GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
  //     schools[i].HAS_MIDDLE_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
  //     schools[i].HAS_HIGH_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
  //   }
  // }

//new zip function
  function cleanZIP (schools) {
    if (typeof schools.ZIPCODE === 'string') {
      split = schools.ZIPCODE.split(' ');
      normalized_zip = parseInt(split[0]);
      schools.ZIPCODE = normalized_zip;
      }
    }

  schools.map(cleanZIP)

//new school class function
function schoolType (schools) {
  if (typeof schools.GRADE_ORG === 'number') {  // if number
    schools.HAS_KINDERGARTEN = schools.GRADE_LEVEL < 1;
    schools.HAS_ELEMENTARY = 1 < schools.GRADE_LEVEL < 6;
    schools.HAS_MIDDLE_SCHOOL = 5 < schools.GRADE_LEVEL < 9;
    schools.HAS_HIGH_SCHOOL = 8 < schools.GRADE_LEVEL < 13;
  } else {  // otherwise (in case of string)
    schools.HAS_KINDERGARTEN = schools.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
    schools.HAS_ELEMENTARY = schools.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
    schools.HAS_MIDDLE_SCHOOL = schools.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
    schools.HAS_HIGH_SCHOOL = schools.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
  }
}
 schools.map(schoolType)


  // // filter data
  // var filtered_data = [];
  // var filtered_out = [];
  // for (var i = 0; i < schools.length - 1; i++) {
  //   isOpen = schools[i].ACTIVE.toUpperCase() == 'OPEN';
  //   isPublic = (schools[i].TYPE.toUpperCase() !== 'CHARTER' ||
  //               schools[i].TYPE.toUpperCase() !== 'PRIVATE');
  //   isSchool = (schools[i].HAS_KINDERGARTEN ||
  //               schools[i].HAS_ELEMENTARY ||
  //               schools[i].HAS_MIDDLE_SCHOOL ||
  //               schools[i].HAS_HIGH_SCHOOL);
  //   meetsMinimumEnrollment = schools[i].ENROLLMENT > minEnrollment;
  //   meetsZipCondition = acceptedZipcodes.indexOf(schools[i].ZIPCODE) >= 0;
  //   filter_condition = (isOpen &&
  //                       isSchool &&
  //                       meetsMinimumEnrollment &&
  //                       !meetsZipCondition);

  //   if (filter_condition) {
  //     filtered_data.push(schools[i]);
  //   } else {
  //     filtered_out.push(schools[i]);
  //   }
  // }
  var filtered_data = [];
  var filtered_out = [];
  //new sorting filter function
  schools.map((schools) => {{
    isOpen = schools.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (schools.TYPE.toUpperCase() !== 'CHARTER' ||
                schools.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (schools.HAS_KINDERGARTEN ||
                schools.HAS_ELEMENTARY ||
                schools.HAS_MIDDLE_SCHOOL ||
                schools.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = schools.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(schools.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition); }
   {if (filter_condition) {
                          filtered_data.push(schools);
                        } else {
                          filtered_out.push(schools);
                        }
  }})


  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // // main loop
  var color;
  // for (var i = 0; i < filtered_data.length - 1; i++) {
  //   isOpen = filtered_data[i].ACTIVE.toUpperCase() == 'OPEN';
  //   isPublic = (filtered_data[i].TYPE.toUpperCase() !== 'CHARTER' ||
  //               filtered_data[i].TYPE.toUpperCase() !== 'PRIVATE');
  //   meetsMinimumEnrollment = filtered_data[i].ENROLLMENT > minEnrollment;

  //   // Constructing the styling  options for our map
  //   if (filtered_data[i].HAS_HIGH_SCHOOL){
  //     color = '#0000FF';
  //   } else if (filtered_data[i].HAS_MIDDLE_SCHOOL) {
  //     color = '#00FF00';
  //   } else {
  //     color = '##FF0000';
  //   }
  //   // The style options
  //   var pathOpts = {'radius': filtered_data[i].ENROLLMENT / 30,
  //                   'fillColor': color};
  //   L.circleMarker([filtered_data[i].Y, filtered_data[i].X], pathOpts)
  //     .bindPopup(filtered_data[i].FACILNAME_LABEL)
  //     .addTo(map);
  // }
    // new label function
    filtered_data.map((filtered_data)=>{
      isOpen = filtered_data.ACTIVE.toUpperCase() == 'OPEN';
        isPublic = (filtered_data.TYPE.toUpperCase() !== 'CHARTER' ||
                    filtered_data.TYPE.toUpperCase() !== 'PRIVATE');
        meetsMinimumEnrollment = filtered_data.ENROLLMENT > minEnrollment;
    })

    
   //map style options
   filtered_data.forEach((filtered_data) => {
    if (filtered_data.HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (filtered_data.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
   })
   

   //mapping
   function mapping (filtered_data){
    var pathOpts = {'radius': filtered_data.ENROLLMENT / 30,
    'fillColor': color};
L.circleMarker([filtered_data.Y, filtered_data.X], pathOpts)
.bindPopup(filtered_data.FACILNAME_LABEL)
.addTo(map);
   }
   filtered_data.forEach(mapping)
})();
