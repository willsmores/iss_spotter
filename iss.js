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

module.exports = { fetchMyIP };