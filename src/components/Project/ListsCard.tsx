export const ProjectListCard = () => {
  return (
    <div className="border bg-white border-[#EAECF0] rounded-lg p-4 mb-2">
      <div className="flex justify-between">
        <div className="flex -space-x-2 overflow-hidden">
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src="/img/platform/1.png"
            alt=""
          />
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src="/img/platform/2.png"
            alt=""
          />
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src="/img/platform/3.png"
            alt=""
          />
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src="/img/platform/4.png"
            alt=""
          />
        </div>
        <div className="rounded-full border border-[#B2DDFF] text-[#175CD3] bg-[#EFF8FF] px-3 py-1">
          Qualified
        </div>
      </div>
      <div className="flex justify-between text-[#272930DE] mt-4">
        <div className="text-sm">List Demo</div>
        <div className="text-base font-medium">10,000 OP</div>
      </div>
      <p className="text-[10px] text-[#4C4E64AD]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
};
