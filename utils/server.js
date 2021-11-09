import axios from "axios";

function geoFetch(postcode) {
  return axios
    .get(`http://api.getthedata.com/postcode/${postcode}`)
    .then((res) => {
      if (res.data.error) {
        return "Invalid";
      } else {
        return {
          longitude: res.data.data.longitude,
          latitude: res.data.data.latitude,
        };
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default geoFetch;
