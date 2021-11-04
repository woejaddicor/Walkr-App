import axios from "axios";

function geoFetch() {
  return axios
    .get(`http://api.getthedata.com/postcode/SK42NX`)
    .then((res) => {
      console.log(res.data.error, "<<<<");
      if (res.data.error) {
        return "Invalid";
      } else {
        console.log(res.data.data);
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
