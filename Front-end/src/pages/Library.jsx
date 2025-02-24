import React from "react";
import LibraryList from "../components/library/LibraryList";
import Options from "../components/library/Options";
import { useNavigate } from "react-router-dom";
import { Modal } from "../UI/Modal";
import VideoPlayer from "../components/VideoPlayer";
import video from "../../testVid.mp4";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import { FaShare } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDownload } from "react-icons/md";

function Library() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("Redirecting to login");
      navigate("/auth?mode=signin");
    }
  }, [navigate]);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: video,
        type: "video/mp4",
      },
    ],
  };
  const closeModal = () => {
    console.log("Closing modal");
    dispatch(uiActions.toggleIsShowingSummary());
  };
  const selectedItem = useSelector((state) => state.library.selectedItem);
  console.log(selectedItem);
  const isShowingSummary = useSelector((state) => state.ui.isShowingSummary);
  return (
    <div className="grid grid-cols-4 py-20">
      {isShowingSummary && (
        <Modal onClose={closeModal}>
          <VideoPlayer options={videoJsOptions} />
          <div className="flex gap-4 justify-between">
            <div className="flex flex-col  ">
              <h1 className="text-3xl font-bold">{selectedItem.title}</h1>
              <p className="w-[350px] overflow-hidden font-semibold">{selectedItem.description}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <button className="flex h-[fit-content] items-center gap-2 bg-[var(--primary-dark)] text-white/90 p-2 rounded-lg cursor-pointer hover:bg-[var(--primary-dark)]/90">
                <FaShare />
                <span>Share</span>
              </button>
              <button className="flex h-[fit-content] items-center gap-2 bg-[var(--primary-dark)] text-white/90 p-2 rounded-lg cursor-pointer hover:bg-[var(--primary-dark)]/90">
                <FaEdit />
                <span>Edit</span>
              </button>
              <button className="flex h-[fit-content] items-center gap-2 bg-[var(--primary-dark)] text-white/90 p-2 rounded-lg cursor-pointer hover:bg-[var(--primary-dark)]/90">
                <MdDownload />
                <span>Download</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="col-span-3">
        <LibraryList />
      </div>
      <div className="col-span-1">
        <Options />
      </div>
    </div>
  );
}

export default Library;
