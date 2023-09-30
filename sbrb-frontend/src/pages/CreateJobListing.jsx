import React, {useState, useRef} from 'react';
import Layout from "../components/Layout";
import {Box, Stack, Grid, GridItem, Flex, Text, Textarea, Button, FormControl, background} from '@chakra-ui/react';
import CompulsoryField from "../components/CompulsoryField";
import SkillSelection from "../components/SkillSelection";
import ReportingManagerSelector from "../components/ReportingManagerSelector";
import CountrySelector from "../components/CountrySelector";
import 'carbon-components/css/carbon-components.min.css';
import Flatpickr from "react-flatpickr";
import CustomDatePicker from "../components/CustomDatePicker";
import ConfirmationModal from "../components/ConfirmationModal";
import "flatpickr/dist/flatpickr.css";
import CustomTextArea from "../components/CustomTextArea";

// - The form should include fields for the job title, job description, required skills, and the deadline for the role listing.
// - Once saved, a confirmation message should be displayed to indicate the successful creation of the role listing.
// - The created role listing should be visible in the list of existing role listings for other users to view.

function CreateJobListing() {

    const [selectedDate, setSelectedDate] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const aggregateFormData = (fieldName, value) => {
      console.log(fieldName, value)
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
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
      console.log(typeof(date))
      console.log(typeof(date[0]))
      const datestr = JSON.stringify(date)
      console.log(datestr)
      console.log(datestr.slice(1, 12))
      setSelectedDate(date);
      aggregateFormData("deadline", datestr);
    };

    const handleInputChange = (e) => {
      console.log(e)
      const { name, value } = e.target;
      if(name == "jobDescription"){
        aggregateFormData(name, value);
      }
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    // const handleSubmit = async(e) => {
    const handleSubmit = (e) => {
      console.log('submit')
        e.preventDefault();
        
        
        if (formData.jobTitle.trim() === "") {
          setIsFormSubmitted(true); 
        } 
        
        
        
        else {
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
          // try {
          //   const response = {};
          //   // const response = await saveDataToDatabase(formData);
          //   response.status = 200;
          //   if (response.status === 200) {
          //     console.log('in here')
          //     setShowModal(true);
          //   } else {
          //     console.log("Failed to save data to the database.");
          //   }
          // } catch (error) {
          //   console.error("An error occurred while saving data:", error);
          // }

          // setFormData({
          //   jobTitle: '',
          //   country: '',
          //   department: '',
          //   skills: [],
          //   reportingManager: '',
          //   jobDescription: '',
          //   deadline: '',
          // });
          // setSelectedDate(null);
          }
      };

  return (
    <>
    <Layout>
    <Box>
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
            <Text mb="8px">Job Title:</Text>
            <CompulsoryField label="Job Title" type="text"  name="jobTitle" required={isFormSubmitted} aggregateFormData={aggregateFormData}/>
        </GridItem>
        <GridItem colSpan={2}  >
            <Text mb="8px" required={isFormSubmitted}
              name="skills" onChange={handleInputChange} >Skills Required:</Text>
           <SkillSelection aggregateFormData={aggregateFormData}/>
        </GridItem>
        <GridItem colSpan={3} >
            <Text mb="8px">Reporting Manager:</Text>
            <ReportingManagerSelector required={isFormSubmitted}
                      onChange={handleInputChange} name="reportingManager" aggregateFormData={aggregateFormData}/>
        </GridItem>
        <GridItem colSpan={2} >
            <Text mb="8px">Country:</Text>
            <CountrySelector aggregateFormData={aggregateFormData}/>
        </GridItem>
        <GridItem colSpan={4} >
            <Text mb="8px" >Job Description:</Text>
            <CustomTextArea placeholder='Please type here..' required={isFormSubmitted} name="jobDescription"
                        onChange={handleInputChange} aggregateFormData={aggregateFormData}/>
        </GridItem>
        <GridItem colSpan={4} bg="beige">

            <Text mb="8px">Application Deadline:</Text>
            <div>

              <Flatpickr ref={fp}  value={selectedDate} onChange={handleDateChange}/>
              <Text fontSize={'12px'}>Click on box to change date.</Text>

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

