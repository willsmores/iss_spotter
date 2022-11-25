const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org/?format=json'); //Implicit return

const fetchCoordsByIP = body => {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = body => {
  const { latitude, longitude } = JSON.parse(body);
  const apiEndpoint = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(apiEndpoint);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };