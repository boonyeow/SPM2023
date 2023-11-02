import { DatePicker } from "antd";
import Layout from "../components/Layout";
import axios from "axios";
import dayjs from "dayjs";
import { useLoginContext } from "../hooks/useLoginContext";
import { useParams } from "react-router-dom";

import {
  Alert,
  AlertIcon,
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
import { useEffect, useRef, useState } from "react";

import * as Yup from "yup";

function EditJobListing() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { loginInfo } = useLoginContext();

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

  const validationSchema = Yup.object({
    role_name: Yup.string().required("Role Name is required"),
    listing_title: Yup.string().required("Listing Title is required"),
    listing_desc: Yup.string().required("Job Description is required"),
    department_name: Yup.string().required("Department is required"),
    country_name: Yup.string().required("Country is required"),
    reporting_manager_id: Yup.string().required(
      "Reporting Manager ID is required"
    ),
    expiry_date: Yup.date()
      .required("Application Deadline is required")
      .test(
        "is-future-date",
        "Application Deadline must be a future date",
        function (date) {
          const cutoff = new Date();
          cutoff.setHours(0, 0, 0, 0);
          return date >= cutoff;
        }
      ),
  });

  const handleUpdateListing = (values) => {
    console.log("formik", formik);
    axios
      .put(`${apiUrl}/listings/${id}`, values)
      .then((res) => {
        console.log("Listing updated successfully:", res);
        setSuccess("Listing has been successfully updated.");
        setError(null);
      })
      .catch((error) => {
        console.error("Error updating listing:", error);
        setError("There was an error processing your request.");
        setSuccess(null);
      });
  };

  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleUpdateListing,
  });
  const formikRef = useRef(formik);
  useEffect(() => {
    axios
      .get(`${apiUrl}/listings/${id}`)
      .then((response) => {
        const roleListingData = response.data;
        const newExpiryDate = roleListingData.expiry_date;
        const updatedRoleListingData = { ...roleListingData };
        updatedRoleListingData["expiry_date"] = newExpiryDate;
        formikRef.current.setValues(updatedRoleListingData);
      })
      .catch((error) => {
        console.error("Error fetching listing data:", error);
      });
  }, [apiUrl, id]);

  return (
    <>
      <Layout>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {success && (
          <Alert status="success">
            <AlertIcon />
            {success}
          </Alert>
        )}
        <Box>
          {loginInfo.role != "User" ? (
            <Formik
              initialValues={formik.values}
              enableReinitialize={true}
              onSubmit={formik.handleSubmit}
              validationSchema={formik.validationSchema}>
              {(formikProps) => (
                <form onSubmit={formikProps.handleSubmit}>
                  <Flex align="center" justify="center" pl="3">
                    <Box w={"4xl"} p={20}>
                      <Heading>Edit Job Listing</Heading>
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
                            isInvalid={
                              formik.touched.department_name &&
                              formik.errors.department_name
                            }>
                            <FormLabel>Department</FormLabel>
                            <Select
                              id="department_name"
                              name="department_name"
                              placeholder="Select a department"
                              {...formik.getFieldProps("department_name")}>
                              {departments.map((department) => (
                                <option key={department} value={department}>
                                  {department}
                                </option>
                              ))}
                            </Select>
                            {formik.touched.department_name &&
                            formik.errors.department_name ? (
                              <FormErrorMessage>
                                {formik.errors.department_name}
                              </FormErrorMessage>
                            ) : null}
                          </FormControl>
                        </GridItem>

                        <GridItem colSpan={2}>
                          <FormControl
                            isRequired
                            isInvalid={
                              formik.touched.country_name &&
                              formik.errors.country_name
                            }>
                            <FormLabel>Country</FormLabel>
                            <Select
                              id="country_name"
                              name="country_name"
                              placeholder="Select a country"
                              {...formik.getFieldProps("country_name")}>
                              {countries.map((country) => (
                                <option key={country} value={country}>
                                  {country}
                                </option>
                              ))}
                            </Select>
                            {formik.touched.country_name &&
                            formik.errors.country_name ? (
                              <FormErrorMessage>
                                {formik.errors.country_name}
                              </FormErrorMessage>
                            ) : null}
                          </FormControl>
                        </GridItem>

                        <GridItem colSpan={2}>
                          <FormControl
                            isRequired
                            isInvalid={
                              formik.touched.role_name &&
                              formik.errors.role_name
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
                                  formik.values.expiry_date) ||
                                null
                              }
                              value={dayjs(formik.values.expiry_date)}
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
                        <Button
                          type="submit"
                          isDisabled={
                            new Date() > new Date(formik.values.expiry_date)
                          }>
                          Submit
                        </Button>
                      </Grid>
                    </Box>
                  </Flex>
                </form>
              )}
            </Formik>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Heading>Not authorized</Heading>
            </Box>
          )}
        </Box>
      </Layout>
    </>
  );
}

export default EditJobListing;
