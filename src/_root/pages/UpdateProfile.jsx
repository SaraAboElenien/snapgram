import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/Shared/Loader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProfileUploader from "@/components/Shared/ProfileUploader";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext } from "@/context/UserContext";
import { toast } from "react-hot-toast";
import api from "@/api/axios";


const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  bio: yup.string().nullable(),
});

const UpdateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData, userToken, setUserData } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    userData?.profileImage ? userData.profileImage.secure_url : null
  );

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      bio: userData?.bio || "",
    },
  });

  if (!userData) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("bio", data.bio || "");

      if (profileImage?.[0]) {
        formData.append("profileImage", profileImage[0]);
      }

      const response = await api.patch(
        "/api/v1/auth/user/updateProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      toast.success("Profile updated successfully!");
      
      // Update local user data
      setUserData((prevData) => ({
        ...prevData,
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio || "",
        profileImage: response.data?.user?.profileImage || prevData.profileImage,
      }));
      
      navigate(`/profile/${id}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleImageChange = (files) => {
    setProfileImage(files);
    if (files?.[0]) {
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/images/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-7 w-full mt-4 max-w-5xl"
        >
          <div className="flex">
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <ProfileUploader
                  fieldChange={handleImageChange}
                  mediaUrl={imagePreview}
                />
              )}
            />
          </div>

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <div>
                <label className="shad-form_label">First Name</label>
                <Input type="text" className="shad-input" {...field} />
              </div>
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <div>
                <label className="shad-form_label">Last Name</label>
                <Input type="text" className="shad-input" {...field} />
              </div>
            )}
          />

          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <div>
                <label className="shad-form_label">Bio</label>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </div>
            )}
          />

          <div className="flex gap-4 items-center justify-end">
            <Button
              type="button"
              className="shad-button_dark_4"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="shad-button_primary whitespace-nowrap"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;