import React, { useState } from 'react';
import {
  Select,
  FormControl,
  FormLabel,
  Text,
  HStack,
  Flex
} from '@chakra-ui/react';

function ReportingManagerSelector() {
  const [selectedManager, setSelectedManager] = useState('');
  const [derivedDepartment, setDerivedDepartment] = useState('');

  const reportingManagers = [
    { name: 'John Smith', department: 'Sales' },
    { name: 'Jane Doe', department: 'Marketing' },
    { name: 'Michael Johnson', department: 'Finance' },
    { name: 'Emily Davis', department: 'Operations' },
  ];

  const handleManagerSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedManager(selectedValue);

    const selectedManagerData = reportingManagers.find(
      (manager) => manager.name === selectedValue
    );

    if (selectedManagerData) {
      setDerivedDepartment(selectedManagerData.department);
    } else {
      setDerivedDepartment(''); 
    }
  };

  return (
    <HStack spacing={5} p={4}>
      <FormControl>
        <Select
          placeholder="Select reporting manager"
          value={selectedManager}
          onChange={handleManagerSelect} required
        >
          {reportingManagers.map((manager) => (
            <option key={manager.name} value={manager.name}>
              {manager.name}
            </option>
          ))}
        </Select>
      </FormControl>
      {derivedDepartment && (
        <>
        
          <Text >
            Department: {derivedDepartment}
          </Text>
     
        </>
      )}
    </HStack>
  );
}

export default ReportingManagerSelector;