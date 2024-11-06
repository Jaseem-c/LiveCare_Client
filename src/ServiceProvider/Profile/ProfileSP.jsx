import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import axios from "axios";
import baseurl from "../../Services/baseurl";
import Swal from "sweetalert2";

function ProfileSP() {
  const [user, setUser] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const token = sessionStorage.getItem("token");

  const getUser = async () => {
    const users = JSON.parse(sessionStorage.getItem("existingUser"));
    setUser(users);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setUser({ ...user, profile_img: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleProfileEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("profile_img", user.profile_img);
      const profile = { profile_img: user.profile_img };
      const response = await axios.post(
        `${baseurl}/update/profile-pic`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status >= 200 && response.status <= 300) {
        Swal.fire({
          title: "Updated Successfully",
          icon: "success",
        });

        getUser();
        console.log(response);
      }
      sessionStorage.setItem(
        "existingUser",
        JSON.stringify(response.data.preUser)
      );
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: error.response
          ? error.response.data.message
          : "An error occurred",
        icon: "error",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(user?.profile_img);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center pt-5">
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          ></AccordionSummary>
          <AccordionDetails>
            <label htmlFor="profile">
              <input
                id="profile"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <img
                src={imagePreview || user?.profile_img || "no image"}
                alt="profile preview"
                style={{ width: "200px", height: "200px", borderRadius: "5px" }}
              />
            </label>
          </AccordionDetails>
          <AccordionActions>
            <Button variant="contained" color="secondary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleProfileEdit}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Submit"}
            </Button>
          </AccordionActions>
        </Accordion>
      </div>{" "}
    </>
  );
}

export default ProfileSP;
