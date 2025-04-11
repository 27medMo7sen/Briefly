import React, { Fragment, useEffect } from "react";
import MainCard from "../components/Home/MainCard";
import MiniForm from "../components/Home/MiniForm";
import VideoPlayer from "../components/VideoPlayer";
import video from "../../testVid.mp4";
import { Modal } from "../UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import SummarizingCard from "../components/Home/SummarizingCard";
import SideComponent from "../components/Home/SideComponent";
function Home() {
  const isSummaryModalOpen = useSelector(
    (state) => state.ui.isSummaryModalOpen
  );
  const dispatch = useDispatch();
  const onCloseSummaryModal = () => {
    dispatch(uiActions.toggleIsSummaryModalOpen());
  };
  useEffect(() => {
    if (isSummaryModalOpen) {
      dispatch(uiActions.toggleIsSummaryModalOpen());
    }
  }, []);
  return (
    <Fragment>
      {isSummaryModalOpen && (
        <Modal onClose={onCloseSummaryModal}>
          <SummarizingCard />
        </Modal>
      )}
      {/* <VideoPlayer options={videoJsOptions} /> */}
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <MainCard />
          <MiniForm />
        </div>
        <div className="col-span-1">
          <SideComponent />
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
