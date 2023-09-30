import React, {useState} from 'react';
import { Textarea } from "@chakra-ui/react";

function CustomTextArea(props) {

    const [input, setInput] = useState('')
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      props.aggregateFormData(name, value); 
      setInput(e.target.value)
    };

  return (
    <Textarea placeholder='Please type here..' value={input} name={props.name}
        onChange={handleInputChange}/>
  )
}

export default CustomTextArea