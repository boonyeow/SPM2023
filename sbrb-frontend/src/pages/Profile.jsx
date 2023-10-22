import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import Layout from "../components/Layout.jsx";
import {
  ProfileHeadCard,
  ProfileJobCard,
  ProfileSkillCard,
} from "../components/Profile/Cards.jsx";

const Profile = () => {
  const [staffProfile, setStaffProfile] = useState({});
  console.log(staffProfile);

  axios
    .get(`http://localhost:8000/staff/150245`)
    .then((response) => {
      setStaffProfile(response.data);
    })
    .catch((error) => {
      console.error("Error fetching staff profile:", error);
    });

  return (
    <>
      <Layout>
        <Box py="8" width="57%" mx="auto">
          <Box mb={8}>
            <ProfileHeadCard />
          </Box>
          <Box mb={8}>
            <ProfileJobCard />
          </Box>
          <Box>
            <ProfileSkillCard />
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Profile;
