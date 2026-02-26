/* eslint-disable react-hooks/set-state-in-effect */
import { ReactNode, useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
const apiKey = "process.env.NEXT_PUBLIC_STREAM_API_KEY";
import { StreamCall, Call } from "@stream-io/video-react-sdk";
const StreamvideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null,
  );

  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey)
      throw new Error("Stream API key is not defined in environment variables");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name:
          user?.username ||
          user?.emailAddresses[0]?.emailAddress ||
          "Unknown User",
        image: user?.imageUrl || undefined,
      },
    });
    setVideoClient(client);
  }, [isLoaded, user]);

  return <StreamVideo client={videoClient}></StreamVideo>;
};

const MyCallUI = ({ client }: { client: StreamVideoClient }) => {
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    const myCall = client.call("default", "my-first-call");
    myCall.join({ create: true }).catch(console.error);
    setCall(myCall);

    return () => {
      myCall.leave().catch(console.error);
      setCall(undefined);
    };
  }, [client]);

  if (!call) return null;

  return <StreamCall call={call}>{/* <MyVideoUI /> */}</StreamCall>;
};
export default StreamvideoProvider;
