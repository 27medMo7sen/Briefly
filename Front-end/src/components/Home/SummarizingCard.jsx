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
  useEffect(() => {
    if (!isCompleted) return;
    dispatch(
      libraryActions.pushItem({
        id: 1,
        image: fake,
        time_stamp: new Date(),
      })
    );
    dispatch(uiActions.toggleIsSummaryModalOpen());
    setTimeout(() => {
      navigate("/library");
    }, 1000);
  }, [isCompleted]);

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
    </div>
  );
}

export default SummarizingCard;
