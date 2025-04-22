import { createContext, useContext, useState } from "react";
const uploadsContext = createContext();
export const UploadsProvider = ({ children }) => {
  const [uploads, setUploads] = useState([]);
  const [ID, setID] = useState(0);
  const [numberOfCurrentUploads, setNumberOfCurrentUploads] = useState(0);
  const addUpload = (video) => {
    setUploads((prev) => [...prev, { file: video, id: ID, uploading: true }]);
    setID((prev) => prev + 1);
    setNumberOfCurrentUploads((prev) => prev + 1);
  };
  const toggleUploading = (id) => {
    setUploads((prev) =>
      prev.map((video) => {
        if (video.id === id) {
          return { ...video, uploading: !video.uploading };
        }
        return video;
      })
    );
  };
  const reduceCurrentUploads = () => {
    setNumberOfCurrentUploads((prev) => prev - 1);
  };
  const removeUpload = (id) => {
    setUploads((prev) => prev.filter((video) => video.id !== id));
  };
  const contextValue = {
    uploads,
    numberOfCurrentUploads,
    reduceCurrentUploads,
    toggleUploading,
    addUpload,
    removeUpload,
  };
  return (
    <uploadsContext.Provider value={contextValue}>
      {children}
    </uploadsContext.Provider>
  );
};
export const useUploadsContext = () => {
  return useContext(uploadsContext);
};
