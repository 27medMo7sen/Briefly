import { Fragment, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
const ViewVideo = () => {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "../../testVid.mp4",
        type: "video/mp4",
      },
    ],
  };
  return (
    <Fragment>
      <div className="flex flex-col gap-5 justify-center p-10 animate-fade-in">
        <VideoPlayer options={videoJsOptions} />
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-[var(--primary-font-color)]">
            The 2030 Agenda for Sustainable Development
          </h1>
          <p className="text-[var(--secondary-font-color)]/80 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatibus. Quisque, quas? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, voluptatibus. Quisque, quas?
          </p>
        </div>
      </div>
    </Fragment>
  );
};
export default ViewVideo;
