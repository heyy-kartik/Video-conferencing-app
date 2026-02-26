/* eslint-disable @next/next/no-async-client-component */
"use client";
import React from "react";
import { useParams } from "next/navigation";

const Meeting = ({ params }: { params: { id: string } }) => {
  const { id } = React.use(params);
  console.log("Meeting ID:", id);
  return <div>Meeting Room :{id} </div>;
};

export default Meeting;
