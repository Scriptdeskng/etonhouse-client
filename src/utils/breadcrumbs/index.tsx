import Link from "next/link";

interface Props {
  history: {
    name: string;
    path?: string;
  }[];
}

const Breadcrumbs = ({ history }: Props) => {
  return (
    <div className="flex items-center gap-1">
      {history.map((item, index) => {
        return index < history.length - 1 ? (
          <Link
            href={item.path ?? "/"}
            key={item.name}
            className="text-lg text-[#414205]"
          >
            {item.name} /
          </Link>
        ) : (
          <p className="text-[#616161AB] text-lg">{item.name}</p>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
