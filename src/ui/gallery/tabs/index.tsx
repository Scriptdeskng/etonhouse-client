const Tabs = ({
  active,
  setActive,
}: {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const data = [
    "All",
    "Living room",
    "Bedroom",
    "Dining",
    "Office",
    "Outdoor",
    "Workspace",
  ];

  return (
    <div className="w-full lg:w-fit bg-beige-100 p-1.5 flex items-center rounded-[44px] overflow-x-auto">
      {data.map((item) => {
        return (
          <button
            className={`shrink-0 w-[140px] h-[45px] flex items-center justify-center text-lg text-black-300 rounded-[32px] ${
              active === item ? "bg-white cursor-default" : "cursor-pointer"
            }`}
            key={item}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
