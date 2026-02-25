import React from "react";
import Meetingstyle from "@/components/Meetingstyle";
const page = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now,
  );

  return (
    <section className="flex items-center justify-center text-center gap-10 flex-col ">
      <div className="h-75 w-full rounded-2xl bg-hero bg-[url('/images/hero-background.png')] bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11  ">
          <h2 className="glassmorphism max-w-67.5 rounded-sm py-1 text-center text-base ">
            Upcoming Meeting at :12:30 PM
          </h2>
          <div className="flex flex-col flex-wrap justify-items-start justify-end  gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl  text-sky-100">
              {time}
            </h1>

            <p className="text-lg font-medium text-sky-100 lg:text-2xl">
              {date}
            </p>
          </div>
        </div>
      </div>
      <Meetingstyle />
    </section>
  );
};

export default page;
