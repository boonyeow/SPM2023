import React, {useState, useRef} from 'react';
import Layout from "../components/Layout";
import {Box, Stack, Grid, GridItem, Flex, Text, Textarea, Button, FormControl, Input, Select} from '@chakra-ui/react';
import { DatePicker } from "antd";
import { useDisclosure } from '@chakra-ui/react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Badge,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function CreateJobListing() {

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedManager, setSelectedManager] = useState('');
  const [derivedDepartment, setDerivedDepartment] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();
  const [wrongSubmission, setWrongSubmission] = useState(false);
  
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
    setFormData({
      ...formData,
      ["country"]: selectedValue,
    })
    setErrors({
      ...errors,
      ["selectedCountry"]: '',
    });
    
  };

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
    
        setFormData({
        ...formData,
        ["reportingManager"]: selectedValue,
        ["department"]: selectedManagerData.department,
      })
      setErrors({
        ...errors,
        ["selectedManager"]: '',
      });
      } else {
        setDerivedDepartment(''); 
      }
    };

    const handleSkillSelect = (e) => {
      const selectedSkill = e.target.value;
      if (!selectedSkills.includes(selectedSkill)) {
        setSelectedSkills([...selectedSkills, selectedSkill]);
        setFormData({
          ...formData,
          ["skills"]: [...selectedSkills, selectedSkill],
        })
        setErrors({
          ...errors,
          ["selectedSkills"]: '',
        });
      }
    };
  
    const handleSkillRemove = (skillToRemove) => {
      const updatedSkills = selectedSkills.filter((skill) => skill !== skillToRemove);
      setSelectedSkills(updatedSkills);
    };
    
    const fp = useRef(null);
    const [formData, setFormData] = useState({
      jobTitle: '',
      country: '',
      department: '',
      skills: [],
      reportingManager:'',
      jobDescription:'',
      deadline:'',
    });
  
    const handleDateChange = (date, dateString) => {
      setSelectedDate(dateString);

      if (!dateString || new Date(dateString) < new Date()) {
        setDateError('Please select a valid future date.');
      } else {
        setDateError('');
      }
    
      setFormData({
        ...formData,
        ["deadline"]: dateString,
      });

      setErrors({
        ...errors,
        ["selectedDate"]: '',
      });
    };

    const [errors, setErrors] = useState({
      jobTitle: 'Job title is required.',
      jobDescription: 'Job description is required.',
      selectedSkills: 'Select at least 1 skill.',
      selectedManager: 'Select a Manager.',
      selectedCountry: 'Select a country.',
      selectedDate: 'Select a deadline.',
    });
  
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
      setErrors({
        ...errors,
        [e.target.id]: '',
      });
    };
    
    const handleCloseAlert = () => {
      onClose();
      setIsSubmitted(false); 
      navigate('/');
    };
    const handleSubmit = async(e) => {
      let hasError = false;

      if (formData.jobTitle.trim() === '') {
        setErrors((prevErrors)=>({...prevErrors,
          jobTitle: 'Job title is required.'
          }));
        hasError = true;
      }
    
      if (formData.jobDescription.trim() === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          jobDescription: 'Job description is required.',
        }));        
        hasError = true;
      }

      if (formData.country.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          selectedCountry: 'Select a country.',
        }));        
        hasError = true;
      }

      if (formData.skills.length === 0) {
        console.log(formData.skills)
        setErrors((prevErrors) => ({
          ...prevErrors,
          selectedSkills: 'Select at least 1 skill.',
        }));        
        hasError = true;
      }

      if (formData.reportingManager.length=== 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          selectedManager: 'Select a Manager.',
        }));        
        hasError = true;
      }
    
      if (formData.deadline.trim() === '') {
        console.log(formData.deadline)
        setErrors((prevErrors) => ({
          ...prevErrors,
          selectedDate: 'Select a deadline.',
        }));        
        hasError = true;
      }
      e.preventDefault();
        
      if(!hasError){
        const formDataJson = {
          jobTitle: formData.jobTitle,
          country: formData.country,
          department: formData.department,
          skills: formData.skills,
          reportingManager: formData.reportingManager,
          jobDescription: formData.jobDescription,  
          deadline: formData.deadline,
        }        

      setWrongSubmission(false);

      console.log(formDataJson)
      setIsSubmitted(true);
      onOpen();
      }
        
 
      else {
  
        setWrongSubmission(true);
          setFormData({
            jobTitle: '',
            country: '',
            department: '',
            skills: [],
            reportingManager: '',
            jobDescription: '',
            deadline: '',
          });
          }
      };

  return (
    <>
    <Layout>
    <Box>
    {wrongSubmission && (
        <Alert status='error'>
          <AlertIcon />
          Please make the necessary changes.
       </Alert>
      )}

    {isSubmitted && (
        <Alert status='success'>
          <AlertIcon />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your application has been received. We will review your application
            and respond within the next 48 hours.
          </AlertDescription>
          <CloseButton
            alignSelf='flex-start'
            position='relative'
            right={-1}
            top={-1}
            onClick={handleCloseAlert}
          />
        </Alert>
      )}

    <form onSubmit={handleSubmit}>
    <Flex align="center" justify="center" pl='3'>
  
    <Box w="90%" p={20}>
      <Grid
      h='100vh'
      templateRows='repeat(6, 1fr)'
      templateColumns='repeat(4, 10fr)'
      gap={4}
      >
        <GridItem colSpan={2} >
          {/* job title */}
            <Text mb="8px">Job Title*:</Text>
          
             <FormControl>
              <Input type="text" value={formData.jobTitle} id="jobTitle" onChange={handleInputChange} name="jobTitle"  />
              {errors.jobTitle && (
                  <Text color="red" fontSize="12px">
                    {errors.jobTitle}
                  </Text>
                )}
                </FormControl>

        </GridItem>
       
       {/* skills */}
        <GridItem colSpan={2}>
          <FormControl>
            <Text mb="8px" required={isFormSubmitted}
              name="skills">Skills Required*:</Text>
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
          {  
            errors.selectedSkills && (
            <Text color="red" fontSize="12px">
              {errors.selectedSkills}
            </Text>
            )}           

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

       
          </FormControl>
        </GridItem>

        {/* reporting manager */}
        <GridItem colSpan={3} >
            <Text mb="8px">Reporting Manager*:</Text>
        <FormControl >
            <Select
              placeholder="Select reporting manager"
              value={selectedManager}
              onChange={handleManagerSelect} required name="reportingManager"
            >
              {reportingManagers.map((manager) => (
                <option key={manager.name} value={manager.name}>
                  {manager.name}
                </option>
              ))}
            </Select>
            {errors.selectedManager && (
                <Text color="red" fontSize="12px">
                  {errors.selectedManager}
                </Text>
              )}

          </FormControl>
          {derivedDepartment && (
              <Text>
                Department: {derivedDepartment}
              </Text>
          )}
        </GridItem>

        {/* country selection */}
        <GridItem colSpan={2} >
            <Text mb="8px">Country*:</Text>
            <Stack spacing={4}>
              <FormControl>
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
                {/* {selectedCountry.length == 0 && (
                  <Text color="red" fontSize="12px">
                    Country is required.
                  </Text>
                )} */}
             {errors.selectedCountry && (
                <Text color="red" fontSize="12px">
                  {errors.selectedCountry}
                </Text>
              )}
              </FormControl>
              {selectedCountry && (
                <Text>
                  You have selected: {selectedCountry}
                </Text>
              )}
            </Stack>
        </GridItem>

        {/* job description */}
        <GridItem colSpan={4} >
            <Text mb="8px" >Job Description*:</Text>
         <FormControl>
            <Textarea placeholder='Please type here..' value={formData.jobDescription} name="jobDescription" id="jobDescription"
              onChange={handleInputChange}/>
             {errors.jobDescription && (
                <Text color="red" fontSize="12px">
                  {errors.jobDescription}
                </Text>
              )}
             </FormControl>
        </GridItem>

        {/* application deadline */}
        <GridItem colSpan={4}>

            <Text mb="8px">Application Deadline*:</Text>
            <div>

            <DatePicker onChange={handleDateChange}></DatePicker>
              <Text fontSize={'12px'}>Click on box to change date.</Text>
            {  
              (dateError || errors.selectedDate) && (
            <Text color="red" fontSize="12px">
              {dateError || errors.selectedDate}
            </Text>
            )}         
              
              <Button
                type="button" size="sm" variant="outline" colorScheme="blue" options={{ minDate: new Date() }}
                onClick={() => {
                  if (!fp?.current?.flatpickr) return;
                  fp.current.flatpickr.clear();
                }}
              >
                Clear
              </Button>
            </div>     

        </GridItem>

       {/*  submit button */}
    <GridItem colSpan={4}>
        <Flex align="center" justify="center">
            <Button variant="outline" colorScheme="blue" onClick={handleSubmit}>Submit</Button>
        </Flex>
    </GridItem>
    </Grid>
    </Box>
    </Flex>

    </form>
  
    </Box>
    {showModal && (
        <ConfirmationModal onClose={() => setShowModal(false)} />
      )}
    </Layout>
    </>
    
  )
}


export default CreateJobListing

