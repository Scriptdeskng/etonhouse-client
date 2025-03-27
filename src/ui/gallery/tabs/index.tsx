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
    <div className="bg-beige-100 p-1.5 flex items-center rounded-[44px]">
      {data.map((item) => {
        return (
          <button
            className={`w-[140px] h-[45px] flex items-center justify-center text-lg text-black-300 rounded-[32px] ${
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
