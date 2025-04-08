import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

interface Props {
  title: string;
  background?: string;
  path?: string;
  className?: string;
  button?: {
    exists?: boolean;
    path?: string;
    text?: string;
  };
  children: React.ReactNode;
}

const PageTitle = ({
  title,
  background = "bg-white",
  className,
  button = { exists: true, text: "BROWSE", path: "/" },
  path = "/",
  children,
}: Props) => {
  return (
    <div className={`w-full py-25 px-16 flex flex-col gap-10 ${background}`}>
      <div
        className={`flex items-center justify-between border-b border-black py-8 ${className}`}
      >
        <h2 className="text-[32px] text-black">{title}</h2>

        {button.exists && (
          <Link
            href={path ?? button.path ?? "/"}
            className="flex items-center gap-1 cursor-pointer"
          >
            <p>{button.text}</p>
            <FiArrowUpRight size={20} />
          </Link>
        )}
      </div>

      {children}
    </div>
  );
};

export default PageTitle;
