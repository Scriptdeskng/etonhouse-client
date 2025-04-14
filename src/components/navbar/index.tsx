import EnterFromY from "@/animated/EnterFromY";
import Logo from "@/utils/logo";
import NavIcon from "@/utils/navicon";
import NavLink from "@/utils/navlink";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface Props {
  active?: number;
}

const Navbar = ({ active = 0 }: Props) => {
  const links = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Shop", path: "/shop" },
    { text: "Gallery", path: "/gallery" },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex items-center justify-between px-5 py-10 xl:px-20 xl:py-10 lg:border-b lg:border-black">
      <EnterFromY
        initial={active === 0 ? -30 : 0}
        duration={active === 0 ? 0.8 : 0}
      >
        <Logo />
      </EnterFromY>

      <EnterFromY
        className="hidden lg:flex items-center gap-15"
        initial={active === 0 ? -30 : 0}
        duration={active === 0 ? 0.8 : 0}
      >
        {links.map((item, index) => {
          return (
            <NavLink
              path={item.path}
              text={item.text}
              active={active}
              index={index}
              key={item.text}
            />
          );
        })}
      </EnterFromY>

      <EnterFromY
        className="flex items-center gap-5 md:gap-10"
        initial={active === 0 ? -30 : 0}
        duration={active === 0 ? 0.8 : 0}
      >
        <NavIcon icon="search" path="/" />
        <div className="hidden lg:flex">
          <NavIcon icon="phone" path="/" />
        </div>
        <NavIcon icon="cart" path="/cart" />
        <div className="hidden lg:flex">
          <NavIcon icon="profile" path="/" />
        </div>
        <div
          className="block lg:hidden cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu size={18} />
        </div>
      </EnterFromY>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full h-screen bg-black/50 z-50 p-5"
          >
            <EnterFromY className="lg:hidden relative flex flex-col items-center gap-6 py-12 bg-white rounded-lg">
              <button
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <IoClose size={24} />
              </button>

              {links.map((item, index) => {
                return (
                  <NavLink
                    path={item.path}
                    text={item.text}
                    active={active}
                    index={index}
                    key={item.text}
                  />
                );
              })}
            </EnterFromY>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
