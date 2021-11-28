import { GEOCODING_API_KEY, GOOGLE_GEOCODING_URL } from '../../common/constants';

export const reverseGeocodeLocationRequest = async (coords = []) => {
  const latlng = coords.join(',');

  try {
    const response = await fetch(`${GOOGLE_GEOCODING_URL}=${latlng}&location_type=APPROXIMATE&result_type=locality&result_type=political&key=${GEOCODING_API_KEY}`);

    const city = await response.json();

    console.log(city.results[0].formatted_address);
    return city.results[0].formatted_address;
  } catch (error) {
    return error;
  }
};
