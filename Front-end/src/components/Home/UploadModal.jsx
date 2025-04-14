import UploadingForm from "./UploadingForm";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../../store/uiSlice";
import { FaArrowRightLong } from "react-icons/fa6";
export const UploadModal = ({ setIsOpen, isOpen }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [videoLink, setVideoLink] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="flex flex-col gap-5 justify-center p-10 animate-fade-in">
      <UploadingForm />
      <form className="flex bg-[var(--primary-font-color)] text-[var(--secondary-font-color)] items-center justify-between p-2 gap-3 rounded-xl w-full">
        <input
          type="email"
          placeholder="Enter Video Link"
          onFocus={(e) => (e.target.placeholder = " ")}
          className="placeholder:text-[var(--secondary-font-color)]/80 w-full focus:outline-none "
        />
        <button type="submit" className="text-white rounded-xl p-2 bg-gray-500">
          <FaArrowRightLong />
        </button>
      </form>
    </div>
  );
};
