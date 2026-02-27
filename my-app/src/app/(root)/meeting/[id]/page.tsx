/* eslint-disable @next/next/no-async-client-component */
"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

const Meeting = ({ params }: { params: { id: string } }) => {
  const { id } = React.use(params);
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setisSetupComplete] = useState(false);

  console.log("Meeting ID:", id);

  return (
    <main className="h-screen w-full ">
      <StreamCall call={}>
        <StreamTheme>
          {!isSetupComplete ? "MeetingSetup" : "Meeting Room "}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
