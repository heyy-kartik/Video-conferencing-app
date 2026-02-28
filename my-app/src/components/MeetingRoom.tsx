/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { cn } from "@/lib/utils";
import { LayoutList, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type CallLayoutType = "grid" | "speaker-left" | "speaker-right";
const MeetingRoom = () => {
  const router = useRouter();
  const [showParticipants, setshowParticipants] = useState(false);
  const [layout, setlayout] = useState<CallLayoutType>("speaker-left");
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  if (callingState != CallingState.JOINED) return <Loader />;
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden pt-4 text-white  ">
        <div className="relative flex size-full items-center justify-center">
          <div className="flex size-full max-x-[1000px] items-center">
            <CallLayout />
          </div>
          <div
            className={cn("h-[calc(100vh-86px)]  hidden ml-2", {
              block: showParticipants,
            })}
          >
            <CallParticipantsList onClose={() => setshowParticipants(false)} />
          </div>
        </div>
        <div className="fixed bottom-0 flex flex-row flex-w-full items-center justify-center gap-5 p-4 ">
          <CallControls onLeave={() => router.push(`/`)} />

          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-none border-b-[#19232d] text-white  bg-[#19232d]">
              {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={() =>
                      setlayout(item.toLowerCase() as CallLayoutType)
                    }
                  >
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-dark-1" />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default MeetingRoom;
