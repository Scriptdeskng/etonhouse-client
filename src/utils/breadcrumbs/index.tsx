import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";

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
        return index < history?.length - 1 ? (
          <Link
            href={item.path ?? "/"}
            key={index}
            className="text-lg text-[#414205] flex items-center gap-2"
          >
            {item.name} <FaAngleRight className="w-4 h-4" />
          </Link>
        ) : (
          <p className="text-[#616161AB] text-lg" key={index}>{item.name}</p>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
