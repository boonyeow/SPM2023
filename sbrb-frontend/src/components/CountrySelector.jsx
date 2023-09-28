import React, { useState } from 'react';
import {
  Select,
  FormControl,
  FormLabel,
  Stack,
  Text
} from '@chakra-ui/react';

function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState('');

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'India',
    'Japan',
    'Brazil',
    'China',
  ];

  const handleCountrySelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
  };

  return (
    <Stack spacing={4} p={4}>
      <FormControl>
        {/* <FormLabel>Select Country</FormLabel> */}
        <Select
          placeholder="Select a country"
          value={selectedCountry}
          onChange={handleCountrySelect}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </Select>
      </FormControl>
      {selectedCountry && (
        <Text>
          You have selected: {selectedCountry}
        </Text>
      )}
    </Stack>
  );
}

export default CountrySelector;
