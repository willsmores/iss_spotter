/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
*/
const request = require('request');

const fetchMyIP = function(callback) {
  
  const apiEndpoint = `https://api.ipify.org/?format=json`;
  
  // This is the request callback
  request(apiEndpoint, (error, response, body) => {
    const data = JSON.parse(body);
    // console.log(data)

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (!error && data) {
      callback(null, data.ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  
  // ip = '184.144.1.22';
  const apiEndpoint = `http://ipwho.is/${ip}`;

  // This is the request callback
  request(apiEndpoint, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    // parse the returned body so we can check its information
    const data = JSON.parse(body);
    // check if "success" is true or not
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }

    const latLongObj = {
      latitude: data.latitude,
      longitude: data.longitude
    };

    callback(error, latLongObj);

  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  
  const apiEndpoint = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  // This is the request callback
  request(apiEndpoint, (error, response, body) => {

    // console.log(data.response);

    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    if (!error && data) {
      callback(null, data.response);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, flyoverDeets) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, flyoverDeets);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };