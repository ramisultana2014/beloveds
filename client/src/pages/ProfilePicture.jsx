import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUploadProfilePicture } from "../../features/user/useUploadProfilePicture";
import { useSelector } from "react-redux";
import Wrapper from "../assets/wrapper/ProfilePicture";
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
    //console.log("data", data);

    // Helper function to convert file to array buffer
    //convertFileToArray(file): This helper function reads the file as an ArrayBuffer, converts it to a Uint8Array, and then converts that into a regular JavaScript array using Array.from.
    const convertFileToArray = async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      //When you use Array.from(new Uint8Array(arrayBuffer)), it converts the binary data from the ArrayBuffer into a regular JavaScript array, where each element represents one byte of the file. This is necessary because JSON serialization (used when sending data to the server) cannot handle Uint8Array directly.
      return Array.from(new Uint8Array(arrayBuffer));
    };
    const imageFile = data.profilePicture[0];
    //console.log(imageFile.name);
    // Convert the files to buffers
    const imageBuffer = await convertFileToArray(imageFile);
    //console.log(imageBuffer);
    uploadProfilePicture(
      { image: imageBuffer },
      {
        onSuccess: () => {
          reset();
          setFileName("");
        },
      }
    );
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
            {isPending ? "Uploading ..." : "Upload"}
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
