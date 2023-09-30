import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, Input
  } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

function CompulsoryField(props) {
    const [input, setInput] = useState('')
    
    // const handleInputChange = (e) => setInput(e.target.value)
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      props.aggregateFormData(name, value); 
      setInput(e.target.value)
    };
    
    const isError = input === ''
    return (
  
        <FormControl isInvalid={props.required}>
        <Input type={props.type} value={input} onChange={handleInputChange} name={props.name}/>
        {!isError ? (
          <FormHelperText>Great!</FormHelperText>
        ) : (
          <FormErrorMessage>{props.label} is required.</FormErrorMessage>
        )}
      </FormControl>)
}

export default CompulsoryField

