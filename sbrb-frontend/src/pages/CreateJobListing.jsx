import { DatePicker } from "antd";
import Layout from "../components/Layout";
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Alert, AlertDescription, AlertIcon, AlertTitle, Badge, Box, Button, CloseButton, Flex, FormControl, Grid, GridItem, Input, Select, Stack, Text, Textarea } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function CreateJobListing() {

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [staffId, setStaffId] = useState('');
  const [derivedDepartment, setDerivedDepartment] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const { onClose } = useDisclosure();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();
  
  const skills = [ 
    'Skill1',
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

  const reportingManagers = {
    "1": {
      "staff_fname": "John",
      "staff_lname": "Doe",
      "dept": "HR",
      "country": "USA",
      "email": "john.doe@example.com",
      "role_name": "Role1",
      "access_id": 1
    },
    "2": {
      "staff_fname": "Jane",
      "staff_lname": "Smith",
      "dept": "IT",
      "country": "Canada",
      "email": "jane.smith@example.com",
      "role_name": "Role2",
      "access_id": 2
    }
  }

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
    
    const [formData, setFormData] = useState({
      role_name: '',
      listing_title: '',
      country: '',
      dept: '',
      skills: [],
      reporting_manager_id: 0,
      reporting_manager: 'John, Doe',
      listing_desc:'',
      created_by: 2,
      expiry_date:'',
      created_by_name: 'Jane, Smith'
    });
  
    const handleDateChange = (date, dateString) => {

      if (!dateString || new Date(dateString) < new Date()) {
        setDateError('Please select a valid future date.');
      } else {
        setDateError('');
      }
    
      setFormData({
        ...formData,
        ["expiry_date"]: new Date(dateString),
      });

      setErrors({
        ...errors,
        ["selectedDate"]: '',
      });
    };

    // error handling
    const [errors, setErrors] = useState({
      listing_title: '',
      listing_desc: '',
      selectedSkills: '',
      staffId: '',
      selectedCountry: '',
      selectedDate: '',
      role_name: ''
    });
  
    const handleStaffIdChange = (e) => {
      if(e.target.id == 'staffId'){
        const enteredId = e.target.value;
        setStaffId(enteredId);
    
        if (reportingManagers[enteredId]) {
          setDerivedDepartment(reportingManagers[enteredId].dept);
          setErrors({
            ...errors,
            ["staffId"]: '',
            ["department"]: '',
          });
          setFormData({
            ...formData,
            ["reporting_manager_id"]: parseInt(enteredId),
            ["dept"]:reportingManagers[enteredId].dept, 
          })
        } else {
          setDerivedDepartment('');
          setErrors({
            ...errors,
            ["staffId"]: 'Invalid staff ID. Please enter a valid ID.',
          });
        }
      }
    }
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
      console.log(formData)

      if (formData.listing_title.trim() === '') {
        setErrors((prevErrors)=>({...prevErrors,
          listing_title: 'Job Title is required.'
          }));
        hasError = true;
      }
    
      if (formData.listing_desc.trim() === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          listing_desc: 'Job Description is required.',
        }));        
        hasError = true;
      }

      if (formData.country.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          selectedCountry: 'Select a Country.',
        }));        
        hasError = true;
      }

      if (formData.skills.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          selectedSkills: 'Select at least 1 Skill.',
        }));        
        hasError = true;
      }

      if (formData.reporting_manager_id == '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          staffId: 'Enter Manager ID.',
        }));        
        hasError = true;
      }
    
      if (formData.expiry_date === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          selectedDate: 'Select a Deadline.',
        }));        
        hasError = true;
      }

      console.log(formData.role_name)
      if (formData.role_name.trim() === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          role_name: 'Enter a Role Name.',
        }));        
        hasError = true;
      }
      e.preventDefault();
        
      if(!hasError){
        // const formDataJson = {
        //   listing_title: formData.listing_title,
        //   country: formData.country,
        //   dept: formData.dept,
        //   skills: formData.skills,
        //   reporting_manager_id: formData.reporting_manager_id,
        //   listing_desc: formData.listing_desc,  
        //   expiry_date: formData.expiry_date,
        //   role_name: formData.role_name,
        //   created_by: 2,
        //   reporting_manager: 'John, Doe',
        //   created_by_name: 'Jane, Smith'
        // }        
      }
      else {
        toast.error('Please make the necessary changes and submit again.', {
          position: toast.POSITION.TOP_CENTER, 
          autoClose: 5000, 
        })}
      };

  return (
    <>
    <Layout>
    <Box>
    <ToastContainer />
    
    {isSubmitted && (
        <Alert status='success'>
          <AlertIcon />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Job Listing has been created successfully.
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
            <Text mb="8px">Job Listing Title*:</Text>
          
             <FormControl>
              <Input type="text" value={formData.listing_title} id="listing_title" onChange={handleInputChange} name="listing_title" />
              {errors.listing_title && (
                  <Text color="red" fontSize="12px">
                    {errors.listing_title}
                  </Text>
                )}
                </FormControl>

        </GridItem>
       
       {/* skills */}
        <GridItem colSpan={2}>
          <FormControl>
            <Text mb="8px"
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
        <GridItem colSpan={2} >
          {/* role name */}
            <Text mb="8px">Role Name:</Text>  
             <FormControl>
              <Input type="text" value={formData.role_name} id="role_name" onChange={handleInputChange} name="role_name"  />
              {  
            errors.role_name && (
            <Text color="red" fontSize="12px">
              {errors.role_name}
            </Text>
            )}    
              </FormControl>
        </GridItem>

        {/* reporting manager */}
        <GridItem colSpan={3} >
            <Text mb="8px">Reporting Manager&rsquo;s Staff ID*:</Text>
        <FormControl >
           
               <Input
                type="text"
                placeholder="Enter Staff ID"
                value={staffId} id="staffId"
                onChange={handleStaffIdChange}
              />
              {  
                  errors.staffId && (
                  <Text color="red" fontSize="12px">
                    {errors.staffId}
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
            <Textarea placeholder='Please type here..' value={formData.listing_desc} name="listing_desc" id="listing_desc"
              onChange={handleInputChange}/>
             {errors.listing_desc && (
                <Text color="red" fontSize="12px">
                  {errors.listing_desc}
                </Text>
              )}
             </FormControl>
        </GridItem>

        {/* application deadline */}
        <GridItem colSpan={4}>

            <Text mb="8px">Application Deadline*:</Text>
            <Box>
            <DatePicker onChange={handleDateChange}></DatePicker>
              <Text fontSize={'12px'}>Click on box to change date.</Text>
            {  
              (dateError || errors.selectedDate) && (
            <Text color="red" fontSize="12px">
              {dateError || errors.selectedDate}
            </Text> 
            )}</Box>     

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
   
    </Layout>
    </>
    
  )
}


export default CreateJobListing

