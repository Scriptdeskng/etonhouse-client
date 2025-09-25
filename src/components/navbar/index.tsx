import EnterFromY from "@/animated/EnterFromY";
import useAuthStore from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
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
  const { isAuthenticated } = useAuthStore();
  const { cart } = useCartStore();

  const links = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Shop", path: "/shop" },
    { text: "Gallery", path: "/gallery" },
    { text: "Packages", path: "/packages" },
    { text: "Registry", path: "/registry" },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full border-b border-black">
      <div className="w-full flex items-center justify-between px-5 py-10 xl:px-20 xl:py-10 max-w-[1536px] mx-auto">
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
          <div className="hidden sm:flex">
            <NavIcon icon="search" path="/" />
          </div>

          <div className="hidden lg:flex">
            <NavIcon icon="phone" path="/" />
          </div>

          <div className="flex relative">
            <NavIcon icon="cart" path="/cart" />

            <div className="cursor-pointer absolute -top-3 -right-2 bg-[#333333] rounded-full text-white text-[8px] leading-none font-bold w-4 h-4 flex items-center justify-center">
              {cart?.length}
            </div>
          </div>

          <div className="flex">
            <NavIcon
              icon="profile"
              path={isAuthenticated ? "/profile" : "/account"}
            />
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
              <EnterFromY className="lg:hidden relative flex flex-col items-center gap-3 py-12 bg-white rounded-lg">
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
    </div>
  );
};

export default Navbar;
