import { useState } from "react";
import { useCreatePost } from "../../features/user/useCreatePost";
import Wrapper from "../assets/wrapper/UploadPost";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
function UploadPost() {
  const { createPost, isPending } = useCreatePost();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");

  const [imageDisplay, setImageDisplay] = useState(null);

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  async function onSubmit(data) {
    //console.log("data", data);

    // Helper function to convert file to array buffer
    //convertFileToArray(file): This helper function reads the file as an ArrayBuffer, converts it to a Uint8Array, and then converts that into a regular JavaScript array using Array.from.
    const convertFileToArray = async (file) => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        //When you use Array.from(new Uint8Array(arrayBuffer)), it converts the binary data from the ArrayBuffer into a regular JavaScript array, where each element represents one byte of the file. This is necessary because JSON serialization (used when sending data to the server) cannot handle Uint8Array directly.
        return Array.from(new Uint8Array(arrayBuffer));
      } catch (err) {
        throw new Error("File conversion failed");
      }
    };
    try {
      const imageFile = data.picture[0];
      //console.log(imageFile);
      // Convert the files to buffers
      const imageBuffer = await convertFileToArray(imageFile);
      createPost(
        {
          image: imageBuffer,
          title: data.title,
        },
        {
          onSuccess: () => {
            reset();
            navigate("/personalpage");
          },
        }
      );
    } catch (err) {
      console.error("Error uploading post:", err);
    }
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImageDisplay(URL.createObjectURL(file));

      // Cleanup previously created object URLs
      return () => {
        URL.revokeObjectURL(imageDisplay);
      };
    } else {
      setFileName("No file selected");
      setImageDisplay(null);
    }
  };
  return (
    <Wrapper>
      <h3>Upload new Post</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          placeholder="please include title "
          className="textarea"
          type="text"
          id="title"
          {...register("title", { required: true, maxLength: 200 })}
          disabled={isPending}
        />
        {errors?.title?.type === "required" && <span>Title is required</span>}
        {errors?.title?.type === "maxLength" && (
          <span>Title must not exceed 200 characters</span>
        )}
        <label
          htmlFor="file-upload"
          className="custom-file-upload"
          onChange={handleFileChange}
        >
          <input
            className="file"
            type="file"
            id="file-upload"
            accept="image/*"
            {...register("picture", {
              required: true,
              validate: {
                size: (fileList) =>
                  fileList[0]?.size <= 5000000 ||
                  "File size should be less than 5MB",
              },
            })}
            disabled={isPending}
          />
          {fileName || "choose your file"}
        </label>
        {errors?.picture?.message && <span>{errors.picture.message}</span>}
        {imageDisplay ? <img src={imageDisplay} alt={fileName} /> : <></>}
        <div className="btns">
          <button disabled={isPending} className="submit" type="submit">
            {isPending ? "......." : "Upload"}
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

export default UploadPost;
