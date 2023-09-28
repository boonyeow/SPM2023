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
    
    const handleInputChange = (e) => setInput(e.target.value)
    
    const isError = input === ''
    return (
  
        <FormControl isInvalid={isError}>
        <Input type={props.type} value={input} onChange={handleInputChange} />
        {!isError ? (
          <FormHelperText>Great!</FormHelperText>
        ) : (
          <FormErrorMessage>{props.label} is required.</FormErrorMessage>
        )}
      </FormControl>)
}

export default CompulsoryField

