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
import { UploadModal } from "../components/Home/UploadModal";
function Home() {
  React.useState(false);
  const isUploadingOptionsOpened = useSelector(
    (state) => state.ui.isUploadingOptionsOpened
  );

  const dispatch = useDispatch();
  const onCloseUploadingModal = () => {
    dispatch(uiActions.toggleIsUploadingOptionsOpened());
  };
  return (
    <Fragment>
      {isUploadingOptionsOpened && (
        <Modal onClose={onCloseUploadingModal}>
          <UploadModal />
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
