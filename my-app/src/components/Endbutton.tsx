import React from "react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
const Endbutton = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMeetingHost =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;
  if (!isMeetingHost) {
    return null; // Hide the end button for non-host participants
  }
  return (
    <div>
      <Button
        className="bg-red-400"
        onClick={async () => {
          await call.endCall();
          router.push(`/
    `);
        }}
      >
        End Call For Everyone
      </Button>
    </div>
  );
};

export default Endbutton;
