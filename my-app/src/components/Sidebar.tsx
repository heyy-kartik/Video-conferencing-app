import React from "react";

const Sidebar = () => {
  return (
    <React.Fragment>
      <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 max-sm:hidden lg:w-66">
        <div className=" flex flex-1 flex-col gap-6"></div>
      </section>
    </React.Fragment>
  );
};

export default Sidebar;
