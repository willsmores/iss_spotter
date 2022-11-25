const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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


fetchISSFlyOverTimes({ latitude: 43.2500208, longitude: -79.8660914 },(error, flyoverDeets) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover:' , flyoverDeets);
});