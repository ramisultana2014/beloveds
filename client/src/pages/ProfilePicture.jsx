import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUploadProfilePicture } from "../../features/user/useUploadProfilePicture";
import { useSelector } from "react-redux";
import Wrapper from "../assets/wrapper/ProfilePicture";
import { resizeImage } from "../utli/imageUtils";
function ProfilePicture() {
  const user = useSelector((store) => store.user.user);
  //console.log("user", user);

  const { uploadProfilePicture, isPending } = useUploadProfilePicture();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  //console.log(fileName);
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  async function onSubmit(data) {
    //console.log(data);
    try {
      const imageFile = data.profilePicture[0];
      const resizedImage = await resizeImage(imageFile, 0.5 * 1024 * 1024); // Resize to 0.5 MB
      const formData = new FormData();
      formData.append("image", resizedImage);

      uploadProfilePicture(formData, {
        onSuccess: () => {
          reset();
          setFileName("");
        },
      });
    } catch (err) {
      console.error("Error uploading post:", err);
    }
  }
  return (
    <Wrapper>
      <h3>Change your personal profile picture</h3>
      {user?.profilePicture ? (
        <img
          src={user?.profilePicture}
          alt={user.name}
          fetchpriority="high"
          style={{ backgroundColor: "#f0f0f0" }}
        />
      ) : (
        <p>you dont have any profile picture</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="file-upload"
          className="custom-file-upload"
          onChange={(e) =>
            setFileName(e.target.files[0]?.name || "No file selected")
          }
        >
          <input
            className="file"
            type="file"
            id="file-upload"
            accept="image/*"
            {...register("profilePicture", {
              required: true,
              validate: {
                size: (fileList) =>
                  fileList[0]?.size <= 15000000 ||
                  "File size should be less than 1MB",
              },
            })}
            disabled={isPending}
          />
          {fileName || "choose your file"}
        </label>
        {errors?.profilePicture?.message && (
          <span>{errors.profilePicture.message}</span>
        )}
        <div className="btns">
          <button disabled={isPending} className="submit" type="submit">
            {isPending ? "..." : "Upload"}
          </button>
          <button
            onClick={() => navigate("/homepage")}
            className="btn cancel"
            type="reset"
            disabled={isPending}
          >
            Cancel
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default ProfilePicture;
