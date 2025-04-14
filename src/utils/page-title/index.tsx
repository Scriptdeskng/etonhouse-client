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
    <div
      className={`w-full px-5 py-10 xl:py-25 xl:px-16 flex flex-col gap-10 ${background}`}
    >
      <div
        className={`flex items-center justify-between lg:border-b lg:border-black lg:py-8 ${className}`}
      >
        <h2 className="text-2xl lg:text-[32px] text-black font-medium">
          {title}
        </h2>

        {button.exists && (
          <Link
            href={path ?? button.path ?? "/"}
            className="hidden lg:flex items-center gap-1 cursor-pointer"
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
