import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlice";
const UploadingForm = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file); // Save file info
      handleUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "video/*",
    multiple: false,
  });

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("video", file);
    dispatch(uiActions.toggleIsSummaryModalOpen());
    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/upload",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //       onUploadProgress: (progressEvent) => {
    //         const percentCompleted = Math.round(
    //           (progressEvent.loaded * 100) / progressEvent.total
    //         );
    //         setUploadProgress(percentCompleted);
    //       },
    //     }
    //   );

    //   setSuccess(`File uploaded successfully! Path: ${response.data.path}`);
    //   setUploadProgress(0);
    // } catch (err) {
    //   setError(err.response?.data?.message || "Upload failed");
    //   setUploadProgress(0);
    // }
  };

  return (
    <div
      {...getRootProps()}
      className={`
    border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all w-[500px]
    ${
      isDragActive
        ? "bg-blue-100 border-blue-500 shadow-lg"
        : "bg-white hover:bg-gray-50 border-gray-300"
    }
  `}
    >
      <input {...getInputProps()} />
      <div className="space-y-2">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {isDragActive ? (
          <p className="text-blue-500 font-semibold">Drop the video here...</p>
        ) : selectedFile ? (
          <p className="text-gray-600 font-medium">{selectedFile.name}</p>
        ) : (
          <>
            <p className="text-gray-600 font-medium">
              Drag & Drop a video here
            </p>
            <p className="text-gray-500 text-sm">or click to select</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadingForm;
