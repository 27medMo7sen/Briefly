import React from "react";
import saveTime from "../../../assets/saveTime.jpeg";
import summarizeLecture from "../../../assets/summarizeLectures.png";
import summarizeMeeting from "../../../assets/summarizeMeetings.png";
function SideComponent() {
  return (
    <div className="relative w-full h-[80vh] mt-20 rounded-2xl animate-floating  p-5 ">
      <img
        src={saveTime}
        alt="saveTime"
        className="w-[400px] rounded-2xl absolute top-0 left-20 z-10 animate-slide-down"
      />
      <img
        src={summarizeLecture}
        alt="summarizeLecture"
        className="w-[400px] rounded-2xl absolute top-30 left-110 z-20 animate-slide-left"
      />
      <img
        src={summarizeMeeting}
        alt="summarizeMeeting"
        className="w-[400px] rounded-2xl absolute top-60 left-0 z-30 animate-slide-up"
      />
    </div>
  );
}

export default SideComponent;
