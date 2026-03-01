import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const call = useCall();
  if (!call) {
    throw new Error("Call object is not available");
  }

  const [isMiccamtoggle, setisMiccamtoggle] = useState(false);
  useEffect(() => {
    if (isMiccamtoggle) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMiccamtoggle, call.camera, call.microphone]);

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center gap-3 text-white ">
        <h1 className="text-3xl font-bold text-white">Meeting is so on...</h1>
        <VideoPreview />
        <div className="flex h-16 items-center justify-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded bg-gray-800 px-4 py-2">
            <input
              type="checkbox"
              checked={isMiccamtoggle}
              onChange={(e) => setisMiccamtoggle(e.target.checked)}
            />
            Join the mic and camera off
          </label>
          <DeviceSettings />
        </div>
        <Button
          className="rounded-md bg-green-500 px-4 py-2.5"
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
        >
          Join Meeting
        </Button>
      </div>
    </>
  );
};

export default MeetingSetup;
