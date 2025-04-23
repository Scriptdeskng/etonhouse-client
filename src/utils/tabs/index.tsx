interface Props {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  tab: any[];
}

const Tabs = ({ active, setActive, tab }: Props) => {
  return (
    <div className="px-2 flex items-center">
      {tab.map((item) => {
        return (
          <button
            key={item?.id}
            className={`h-[45px] px-2 capitalize flex items-center justify-center text-black-300 rounded-4xl ${
              active === item?.slug
                ? "bg-white cursor-default font-medium"
                : "cursor-pointer"
            }`}
            onClick={() => setActive(item?.slug)}
          >
            {item?.name.split("-").join(" ")}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
