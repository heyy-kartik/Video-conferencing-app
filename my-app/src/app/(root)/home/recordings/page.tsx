import CallList from "@/components/Calllist";

const Recordings = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">
        Recordings of the Previous meetings
      </h1>
      <CallList type="recordings" />
    </section>
  );
};

export default Recordings;
