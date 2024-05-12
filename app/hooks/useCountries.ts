let csc = require('country-state-city').default;
import { Country, State, City } from 'country-state-city';



const useCountries = () => {
  const albania = Country.getCountryByCode('AL');
  const albanianCities = albania ? City.getCitiesOfCountry(albania.isoCode) : [];

  const getAll = () => {

    if (!albania || !albanianCities) {
      return [];
    }
    // Format the data to match the desired format
    const formattedCities = albanianCities.map((city, index) => ({
      value: index.toString(), // Use the index as a unique identifier
      label: city.name,
      latlng: [
        city.latitude ? parseFloat(city.latitude) : 0, 
        city.longitude ? parseFloat(city.longitude) : 0
      ],
      region: 'Albania' ,// You may add administrative region if available
      flag: albania.flag

    }));

    return formattedCities;
  };

  const getByValue = (value: string) => {
    if (value) {
      if (!albania || !albanianCities) {
        return null;
      }
      // Find the city by its index in the array
      const index = parseInt(value);

      if (!isNaN(index) && index >= 0 && index < albanianCities.length) {
        const city = albanianCities[index];

        return {
          value: value,
          label: city.name,
          latlng: [
            city.latitude ? parseFloat(city.latitude) : 0, 
            city.longitude ? parseFloat(city.longitude) : 0
          ],         
          region: albania.name, // You may add administrative region if available
          flag: albania.flag
        };
      }
    }
    
    return null;
  };

  return {
    getAll,
    getByValue
  };
};

export default useCountries;
