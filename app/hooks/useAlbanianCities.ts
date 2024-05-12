const csc = require('country-state-city').default;

const useAlbanianCities = () => {
  const getAll = () => {
    // Find Albania in the list of countries
    const albania = csc.getCountryByCode('AL');

    // Retrieve all cities of Albania
    const cities = csc.getCitiesOfCountry(albania.id);

    // Format the data to match the desired format
    const formattedCities = cities.map((city: { id: any; name: any; latitude: string; longitude: string; }) => ({
      value: city.id,
      label: city.name,
      latlng: [parseFloat(city.latitude), parseFloat(city.longitude)],
      region: '' // You may add administrative region if available
    }));

    console.log(formattedCities);
    return formattedCities;
  };

  const getByValue = (value: any) => {
    // Find the city by its ID
    const city = csc.getCityById(value);

    if (city && city.countryCode === 'AL') {
      return {
        value: city.id,
        label: city.name,
        latlng: [parseFloat(city.latitude), parseFloat(city.longitude)],
        region: '' // You may add administrative region if available
      };
    } else {
      return null;
    }
  };

  return {
    getAll,
    getByValue
  };
};

module.exports = useAlbanianCities;
