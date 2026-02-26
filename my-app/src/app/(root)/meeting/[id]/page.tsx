"use client";
import React from "react";
import { useParams } from "next/navigation";

const page = ({ params }: { params: { id: string } }) => {
  return <div>Meeting Room :{params.id} </div>;
};

export default page;
