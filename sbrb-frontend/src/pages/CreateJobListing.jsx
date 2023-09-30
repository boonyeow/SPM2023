import React, {useState, useRef} from 'react';
import Layout from "../components/Layout";
import {Box, Stack, Grid, GridItem, Flex, Text, Textarea, Button, FormControl, Input, Select} from '@chakra-ui/react';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
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
// - The form should include fields for the job title, job description, required skills, and the deadline for the role listing.
// - Once saved, a confirmation message should be displayed to indicate the successful creation of the role listing.
// - The created role listing should be visible in the list of existing role listings for other users to view.

function CreateJobListing() {

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedManager, setSelectedManager] = useState('');
  const [derivedDepartment, setDerivedDepartment] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();
  
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
  
    const handleDateChange = (date) => {
      var d = JSON.stringify(date)
      d = d.substring(2, d.length-2);
      var date = new Date(d);
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      setSelectedDate(date);

      if (!date || date < new Date()) {
        setDateError('Please select a valid future date.');
      } else {
        setDateError('');
      }
    
      setFormData({
        ...formData,
        ["deadline"]: formattedDate,
      });
    };

    const [errors, setErrors] = useState({
      jobTitle: 'Job title is required.',
      jobDescription: 'Job description is required.',
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
    // const handleSubmit = async(e) => {
    const handleSubmit = (e) => {
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

      console.log(formDataJson)
      setIsSubmitted(true);
      onOpen();


      }
        
 
      else {
   
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
          {selectedSkills.length < 1 && (
                  <Text color="red" fontSize="12px">
                    Skills are required.
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
            {selectedManager.length == 0 && (
                  <Text color="red" fontSize="12px">
                    Reporting Manager is required.
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
                {selectedCountry.length == 0 && (
                  <Text color="red" fontSize="12px">
                    Country is required.
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
        <GridItem colSpan={4} bg="beige">

            <Text mb="8px">Application Deadline*:</Text>
            <div>
              <Flatpickr ref={fp}  value={selectedDate} onChange={handleDateChange}/>
              <Text fontSize={'12px'}>Click on box to change date.</Text>
              
              {(dateError || (selectedDate == "")) && (
                  <Text color="red" fontSize="12px">
                    {dateError || "Please select a valid future date."}
                  </Text>
                )}<Button
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

