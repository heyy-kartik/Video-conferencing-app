"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Homecard from "./Homecard";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import MeetingModal from "./MeetingModal";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import Loader from "./Loader";

const Meetingstyle = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calldetails, setcalldetails] = useState<Call>();
  const [values, setvalues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const createMeeting = async () => {
    if (!client) {
      toast("Video client not ready. Please wait...");
      return;
    }
    if (!user) {
      toast("Please sign in to create a meeting.");
      return;
    }

    const id = crypto.randomUUID();

    try {
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create a call");

      const startsAt =
        values.dateTime.toISOString() || new Date().toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setcalldetails(call);

      // Close modal and navigate to the meeting page
      setMeetingState(undefined);
      router.push(`/meeting/${call.id}`);
    } catch (error) {
      toast("An error occurred while creating the meeting. Please try again.");
      console.error("Error creating meeting:", error);
    }
  };
  if (!user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${calldetails?.id}`;
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
        buttonText="Start Meeting"
        className="text-center"
        handleClick={createMeeting}
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
    </>
  );
};

export default Meetingstyle;
