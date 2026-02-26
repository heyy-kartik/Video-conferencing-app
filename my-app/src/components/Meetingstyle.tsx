"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Homecard from "./Homecard";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import MeetingModal from "./MeetingModal";
const Meetingstyle = () => {
  const router = useRouter();
  const { user } = useUser();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const createMeeting = () => {};
  const { toast } = useToast();
  return (
    <>
      <div>
        <section className="grid w-300 grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4 s  sm:max-w-175 xl:max-w-full">
          <Homecard
            className="bg-blue-400"
            title=" New Meeting "
            description=" Start an instant meeting"
            img="/icons/add-meeting.svg"
            handleClick={() => setMeetingState("isInstantMeeting")}
          />
          <Homecard
            className="bg-purple-300"
            title="Join Meeting"
            description=" Join meetings with a code "
            img="/icons/join-meeting.svg"
            handleClick={() => setMeetingState("isJoiningMeeting")}
          />
          <Homecard
            className="bg-blue-300"
            title="Schedule Meeting "
            description="Schedule meetings"
            img="/icons/schedule.svg"
            handleClick={() => setMeetingState("isScheduleMeeting")}
          />
          <Homecard
            className="bg-green-300"
            title=" View Recordings "
            description=" Meeting recordings"
            img="/icons/recordings.svg"
            handleClick={() => router.push("/recordings")}
          />
        </section>
      </div>
      <MeetingModal
        isOpen={meetingState == "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        buttonText=" Start Meeting"
        className="text-center "
      />
      <MeetingModal
        isOpen={meetingState == "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the meeting code to join"
        buttonText=" Join Meeting"
        className="text-center "
      />
      <MeetingModal
        isOpen={meetingState == "isScheduleMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Schedule a Meeting for later"
        buttonText=" Schedule Meeting"
        className="text-center "
      />
      <MeetingModal
        isOpen={meetingState == "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Get access to your meeting recordings"
        buttonText=" View Recordings"
        className="text-center "
      />
    </>
  );
};

export default Meetingstyle;
function useToast(): { toast: any } {
  throw new Error("Function not implemented.");
}
