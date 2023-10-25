import { DatePicker } from "antd";
import Layout from "../components/Layout";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Formik, useFormik } from "formik";

import * as Yup from "yup";

function CreateJobListing() {
  const countries = [
    "Malaysia",
    "Hong Kong",
    "Indonesia",
    "Vietnam",
    "Singapore",
  ];

  const departments = [
    "Chariman",
    "CEO",
    "Consultancy",
    "Engineering",
    "Finance",
    "HR",
    "IT",
    "Sales",
    "Solutioning",
  ];

  const roles = [
    "Account Manager",
    "Admin Executive",
    "Call Centre",
    "Consultancy Director",
    "Consultant",
    "Developer",
    "Engineering Director",
    "Finance Executive",
    "Finance Director",
    "Finance Manager",
    "HR Director",
    "HR Executive",
    "IT Analyst",
    "IT Director",
    "Junior Engineer",
    "L&D Executuve",
    "Ops Planning Exec",
    "Sales Director",
    "Sales Manager",
    "Senior Engineer",
    "Solutioning Director",
    "Support Engineer",
  ];

  const handleCreateListing = () => {
    console.log();
    axios
      .post("http://localhost:8000/listing/create", {
        role_name: formik.values.role_name,
        listing_title: formik.values.listing_title,
        listing_desc: formik.values.listing_desc,
        department_name: formik.values.dept,
        country_name: formik.values.country,
        reporting_manager_id: formik.values.reporting_manager_id,
        created_by_id: formik.values.created_by_id,
        expiry_date: formik.values.expiry_date.toISOString(),
      })
      .then((res) => console.log("res", res));
  };

  const formik = useFormik({
    initialValues: {
      role_name: "Sales Director",
      listing_title: "[NEW] Sales Director",
      listing_desc: "Hello, this is a sample description",
      dept: "Sales",
      country: "Singapore",
      reporting_manager_id: "140900",
      created_by_id: "210020",
      expiry_date: null,
    },
    validationSchema: Yup.object({
      role_name: Yup.string().required("Required"),
      listing_title: Yup.string().required("Required"),
      listing_desc: Yup.string().required("Required"),
      dept: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      reporting_manager_id: Yup.string().required("Required"),
      expiry_date: Yup.date().required("Required"),
    }),
    onSubmit: handleCreateListing,
  });

  return (
    <>
      <Layout>
        <Box>
          <Formik
            initialValues={formik.initialValues}
            onSubmit={formik.handleSubmit}
            validationSchema={formik.validationSchema}>
            {(formikProps) => (
              <form onSubmit={formikProps.handleSubmit}>
                <Flex align="center" justify="center" pl="3">
                  <Box w={"4xl"} p={20}>
                    <Heading>Create Job Listing</Heading>
                    <Grid mt={4} templateColumns="repeat(6, 10fr)" gap={4}>
                      <GridItem colSpan={6}>
                        <FormControl
                          isRequired
                          isInvalid={
                            formik.touched.listing_title &&
                            formik.errors.listing_title
                          }>
                          <FormLabel>Listing Title</FormLabel>
                          <Input
                            id="listing_title"
                            name="listing_title"
                            type="text"
                            placeholder="Enter Listing Title"
                            {...formik.getFieldProps("listing_title")}
                          />
                          {formik.touched.listing_title &&
                          formik.errors.listing_title ? (
                            <FormErrorMessage>
                              {formik.errors.listing_title}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={6}>
                        <FormControl
                          isRequired
                          isInvalid={
                            formik.touched.listing_desc &&
                            formik.errors.listing_desc
                          }>
                          <FormLabel>Job Description</FormLabel>
                          <Textarea
                            rows={6}
                            id="listing_desc"
                            name="listing_desc"
                            type="text"
                            placeholder="Enter Job Description"
                            {...formik.getFieldProps("listing_desc")}
                          />
                          {formik.touched.listing_desc &&
                          formik.errors.listing_desc ? (
                            <FormErrorMessage>
                              {formik.errors.listing_desc}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={2}>
                        <FormControl
                          isRequired
                          isInvalid={formik.touched.dept && formik.errors.dept}>
                          <FormLabel>Department</FormLabel>
                          <Select
                            id="dept"
                            name="dept"
                            placeholder="Select a department"
                            {...formik.getFieldProps("dept")}>
                            {departments.map((department) => (
                              <option key={department} value={department}>
                                {department}
                              </option>
                            ))}
                          </Select>
                          {formik.touched.dept && formik.errors.dept ? (
                            <FormErrorMessage>
                              {formik.errors.dept}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={2}>
                        <FormControl
                          isRequired
                          isInvalid={
                            formik.touched.country && formik.errors.country
                          }>
                          <FormLabel>Country</FormLabel>
                          <Select
                            id="country"
                            name="country"
                            placeholder="Select a country"
                            {...formik.getFieldProps("country")}>
                            {countries.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </Select>
                          {formik.touched.country && formik.errors.country ? (
                            <FormErrorMessage>
                              {formik.errors.country}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={2}>
                        <FormControl
                          isRequired
                          isInvalid={
                            formik.touched.role_name && formik.errors.role_name
                          }>
                          <FormLabel>Role</FormLabel>
                          <Select
                            id="role_name"
                            name="role_name"
                            placeholder="Select a role"
                            {...formik.getFieldProps("role_name")}>
                            {roles.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </Select>
                          {formik.touched.role_name &&
                          formik.errors.role_name ? (
                            <FormErrorMessage>
                              {formik.errors.role_name}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={3}>
                        <FormControl
                          isRequired
                          isInvalid={
                            formik.touched.reporting_manager_id &&
                            formik.errors.reporting_manager_id
                          }>
                          <FormLabel>Reporting Manager</FormLabel>
                          <Input
                            placeholder="Enter Reporting Manager ID"
                            id="reporting_manager_id"
                            name="reporting_manager_id"
                            {...formik.getFieldProps(
                              "reporting_manager_id"
                            )}></Input>
                          {formik.touched.reporting_manager_id &&
                          formik.errors.reporting_manager_id ? (
                            <FormErrorMessage>
                              {formik.errors.reporting_manager_id}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      </GridItem>

                      <GridItem colSpan={3}>
                        <FormControl
                          isRequired
                          isInvalid={
                            formik.touched.expiry_date &&
                            formik.errors.expiry_date
                          }>
                          <FormLabel>Application Deadline</FormLabel>
                          <Input
                            id="expiry_date"
                            name="expiry_date"
                            selected={
                              (formik.values.expiry_date &&
                                new Date(formik.values.expiry_date)) ||
                              null
                            }
                            onChange={(val) => {
                              formik.setFieldValue("expiry_date", val);
                            }}
                            onBlur={formik.handleBlur}
                            as={DatePicker}></Input>
                          {formik.touched.expiry_date &&
                          formik.errors.expiry_date ? (
                            <FormErrorMessage>
                              {formik.errors.expiry_date}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      </GridItem>
                      <Button type="submit">Submit</Button>
                    </Grid>
                  </Box>
                </Flex>
              </form>
            )}
          </Formik>
        </Box>
      </Layout>
    </>
  );
}

export default CreateJobListing;
