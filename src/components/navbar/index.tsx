import Logo from "@/utils/logo";
import NavIcon from "@/utils/navicon";
import NavLink from "@/utils/navlink";

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

  return (
    <div className="w-full flex items-center justify-between px-20 py-10">
      <Logo />

      <div className="flex items-center gap-15">
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
      </div>

      <div className="flex items-center gap-10">
        <NavIcon icon="search" path="/" />
        <NavIcon icon="phone" path="/" />
        <NavIcon icon="cart" path="/" />
        <NavIcon icon="profile" path="/" />
      </div>
    </div>
  );
};

export default Navbar;
