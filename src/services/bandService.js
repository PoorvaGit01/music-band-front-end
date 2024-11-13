import axios from "axios";

const MUSICBRAINZ_BASE_URL = "https://musicbrainz.org/ws/2";
const GEOJS_API_URL = "https://get.geojs.io/v1/ip/geo.json";

export const fetchBands = async (city) => {
  try {
    const response = await axios.get(
      `${MUSICBRAINZ_BASE_URL}/artist/?query=area:${city} AND begin:[${new Date().getFullYear() - 10} TO *]&fmt=json`
    );
    return response.data.artists.slice(0, 50);
  } catch (error) {
    throw new Error("Failed to fetch bands.");
  }
};

export const fetchUserCity = async () => {
  try {
    const geoResponse = await axios.get(GEOJS_API_URL);
    return geoResponse.data.city;
  } catch (error) {
    throw new Error("Failed to fetch user location.");
  }
};
