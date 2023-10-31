import { Box } from "@chakra-ui/react";
import Layout from "../components/Layout.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";
import { useLoginContext } from "../hooks/useLoginContext.js";
import { useQuery } from "@tanstack/react-query";
import {
  ProfileHeadCard,
  ProfileSkillCard,
} from "../components/Profile/Cards.jsx";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { loginInfo } = useLoginContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/staff/${id}`);
      // console.log(data);
      return res.data;
    },
    retry: 3,
  });

  useEffect(() => {
    if (loginInfo.isLoggedIn != undefined && !loginInfo.isLoggedIn)
      navigate("/");

    if (
      loginInfo.role != undefined &&
      loginInfo.role == "User" &&
      id &&
      loginInfo.userId != id
    )
      navigate("/listings");
  }, [navigate, loginInfo, id]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "Error!",
        text: "Redirecting to home page...",
        icon: "error",
      });
      setTimeout(() => {
        navigate("/listings");
      }, 2000);
    }
  }, [navigate, isError]);

  return (
    <>
      <Layout>
        <Box py="8" width="57%" mx="auto">
          <Box mb={8}>
            <ProfileHeadCard
              name={data?.staff_fname + " " + data?.staff_lname}
              country={data?.country_name}
              department={data?.department_name}
              email={data?.email}
              isLoading={isLoading}
            />
          </Box>
          <Box>
            <ProfileSkillCard skills={data?.skills} isLoading={isLoading} />
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Profile;
