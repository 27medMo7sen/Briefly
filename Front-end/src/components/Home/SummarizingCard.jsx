import React, { useEffect, useState } from "react";
import { libraryActions } from "../../../store/librarySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import fake from "../../../assets/fake.png";
import { uiActions } from "../../../store/uiSlice";

function SummarizingCard() {
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const isCompleted = progress === 100;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Simulating progress update
  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(() => {
      if (isMounted) {
        setProgress((prev) => (prev < 100 ? prev + 10 : prev));
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Form validation
  const validateForm = () => {
    let newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(
      libraryActions.pushItem({
        id: 1,
        image: fake,
        title,
        description,
        time_stamp: new Date(),
      })
    );
    dispatch(uiActions.toggleIsSummaryModalOpen());
    setTimeout(() => {
      navigate("/library");
    }, 1000);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-[500px] mx-auto">

      {/* Progress Bar & Status */}
      <div className="mt-2 text-sm font-medium text-gray-600">
        {isCompleted ? (
          <span className="text-green-600">✔ Done</span>
        ) : (
          <span className="text-[var(--primary)]">⏳ In Progress...</span>
        )}
      </div>

      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-[var(--primary)] transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Form - Only visible when progress reaches 100% */}
      {isCompleted && (
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Summary Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`mt-1 block w-full border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:border-[var(--primary)] focus:ring focus:ring-[var(--primary)] focus:ring-opacity-50 sm:text-sm p-2`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Summary Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`mt-1 block w-full border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:border-[var(--primary)] focus:ring focus:ring-[var(--primary)] focus:ring-opacity-50 sm:text-sm p-2`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-[var(--primary)] text-white px-4 py-2 rounded-md w-full hover:bg-opacity-90 transition"
            >
              Save Summary
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SummarizingCard;
