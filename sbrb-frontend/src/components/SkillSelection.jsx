import React, { useState } from 'react';
import {
  GridItem,
  Select,
  Badge,
  Text,
} from '@chakra-ui/react';

function SkillSelection() {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillSelect = (e) => {
    const selectedSkill = e.target.value;
    if (!selectedSkills.includes(selectedSkill)) {
      setSelectedSkills([...selectedSkills, selectedSkill]);
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter((skill) => skill !== skillToRemove);
    setSelectedSkills(updatedSkills);
  };

  const skills = [ 
  'Communication Skills',
  'Teamwork',
  'Problem Solving',
  'Leadership',
  'Time Management',
  'Adaptability',
  'Creativity',
  'Critical Thinking',
  'Project Management',
  'Data Analysis',];

  return (
    <GridItem colSpan={2} bg='papayawhip'>
      <Select
        placeholder='Select option'
        onChange={handleSkillSelect}
      >
        {skills.map((skill, index) => (
          <option key={index} value={skill}>
            {skill}
          </option>
        ))}
      </Select>

      {selectedSkills.length > 0 && (
        <div>
          <Text mt="8px">Selected Skills:</Text>  <Text fontSize={'12px'}>Click the badge to remove skill</Text>
          {selectedSkills.map((skill, index) => (
            <Badge
              key={index}
              colorScheme="blue"
              variant="outline"
              cursor="pointer"
              ml="2"
              mt="2"
              onClick={() => handleSkillRemove(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      )}
    </GridItem>
  );
}

export default SkillSelection;
