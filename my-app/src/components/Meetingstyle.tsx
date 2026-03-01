"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Homecard from "./Homecard";
import { Textarea } from "./ui/textarea";
import { useUser } from "@clerk/nextjs";
import MeetingModal from "./MeetingModal";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import Loader from "./Loader";
import { DatePickerTime } from "./date-picker-time";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedTime, setSelectedTime] = useState<string>("10:30:00");
  const [meetingLink, setMeetingLink] = useState("");
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

      // Combine selected date and time
      let startsAt: string;
      if (selectedDate && selectedTime) {
        const [hours, minutes, seconds] = selectedTime.split(":").map(Number);
        const combinedDateTime = new Date(selectedDate);
        combinedDateTime.setHours(hours, minutes, seconds || 0);
        startsAt = combinedDateTime.toISOString();
      } else {
        startsAt = values.dateTime.toISOString();
      }

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
      if (meetingState === 'isInstantMeeting') {
        router.push(`/meeting/${call.id}`);
      } else {
        toast.success("Meeting scheduled successfully!");
      }
      setMeetingState(undefined);
    } catch (error) {
      toast("An error occurred while creating the meeting. Please try again.");
      console.error("Error creating meeting:", error);
    }
  };
  
  const joinMeeting = () => {
    if (!meetingLink) {
      toast.error("Please enter a meeting link");
      return;
    }
    router.push(meetingLink);
  };
  if (!user) return <Loader />;

  const createdMeetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${calldetails?.id}`;
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
            className="bg-gray-600"
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
      {!calldetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setvalues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <DatePickerTime
              date={selectedDate}
              time={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(createdMeetingLink);
            toast.success("Link Copied");
          }}
          image={"/icons/checked.svg"}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}
      
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Enter the meeting link to join"
        buttonText="Join Meeting"
        handleClick={joinMeeting}
        className="text-center"
      >
        <div className="flex flex-col gap-2.5">
          <label className="text-base font-normal leading-[22.4px] text-sky-2">
            Paste meeting link
          </label>
          <input
            type="text"
            placeholder="https://zoom-clone.com/meeting/..."
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            className="border-none bg-dark-3 rounded-md p-3 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </MeetingModal>
      
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
        className="text-center"
      />
    </>
  );
};

export default Meetingstyle;
