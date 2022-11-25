const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP('184.144.1.22', (error, coords) => {
//   console.log(error);
//   console.log(coords);
// });


// fetchISSFlyOverTimes({ latitude: 43.2500208, longitude: -79.8660914 },(error, flyoverDeets) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyover:' , flyoverDeets);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  passTimes.forEach(pass => {

    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;

    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  });

});
