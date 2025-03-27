interface Props {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs = ({ active, setActive }: Props) => {
  const tab = ["Chair", "Beds", "Sofa", "Lamp"];

  return (
    <div className="px-2 flex items-center">
      {tab.map((item) => {
        return (
          <button
            key={item}
            className={`w-21 h-[45px] flex items-center justify-center text-lg text-black-300 rounded-4xl ${
              active === item ? "bg-white cursor-default" : "cursor-pointer"
            }`}
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
