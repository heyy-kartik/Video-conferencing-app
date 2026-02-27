/* eslint-disable @next/next/no-async-client-component */
"use client";
import React, { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import { Loader } from "lucide-react";
import { useGetCallById } from "../../../../../hooks/useGetCallById";
const Meeting = ({ params }: { params: { id: string } }) => {
  const { id } = React.use(params);
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setisSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;
  if (!call)
    return (
      <div className="text-center text-3xl font-bold text-white">
        Call not found
      </div>
    );

  // const notAllowed =
  //   call.type === "invited" &&
  //   (!user || !call.state.members.find?.includes(user.id));
  return (
    <main className="h-screen w-full ">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setisSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
