import Button from "./Button";
import Dashboard from "./Dashboard";
import React from "react";
import axios from "axios";
import styled from "styled-components";
import userStore from "../hook/userStore";

const Inner = styled.div`
  margin-top: 50px;

  .btn {
    margin-top: 30px;
  }

  .flex {
    align-items: center;
  }

  @media (max-width: 768px) {
    .flex {
      align-items: start;
      flex-direction: column;
    }

    label {
      margin-top: 9px;
      font-size: 12px;
    }
  }

  p {
    margin-left: 10px;
    color: #f08080;
    cursor: pointer;
  }

  input[type="file"] {
    display: none;
  }
`;

const ImageContainer = styled.label`
  height: 110px;
  width: 110px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 90px;
    width: 90px;
  }
`;
const url = "https://fine-eel-tunic.cyclic.app/api/v1";

const Profile = () => {
  const [image, setImage] = React.useState(null);
  const [profile, setProfile] = React.useState(null);

  const [clicked, setClicked] = React.useState(false);

  const { setUser, user } = userStore();

  const authToken = user.token;

  React.useEffect(() => {
    // Check if the user has an imageUrl and update the state
    if (user && user.imageUrl) {
      setImage(user.imageUrl);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    try {
      if (!profile) {
        return;
      }
      setClicked(true);

      const formData = new FormData();
      formData.append("image", profile);

      const response = await axios.post(`${url}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Assuming the response contains the imageUrl
      const { imageUrl } = response.data;

      setUser({ ...user, imageUrl });

      // Handle imageUrl as needed (e.g., update the UI)
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setClicked(false);
    }
  };

  return (
    <Dashboard>
      <Inner>
        <div className="flex ai-center">
          <ImageContainer>
            {image ? <img src={image} alt="Profile" /> : null}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="profile-image"
            />
          </ImageContainer>
          <label htmlFor="profile-image" className="pointer">
            <p>Click to upload a picture</p>
          </label>
        </div>
        <div className="btn">
          <Button
            title={clicked ? "Uploading..." : "Upload Picture"}
            onClick={handleUpload}
          />
        </div>
      </Inner>
    </Dashboard>
  );
};

export default Profile;
