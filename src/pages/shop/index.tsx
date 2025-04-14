import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Showroom from "@/components/showroom";
import ShopProducts from "@/ui/shop/shop-products";
import ShopSidebar from "@/ui/shop/shop-sidebar";

const Shop = () => {
  return (
    <Entrance>
      <Navbar active={2} />
      <div className="w-full grid lg:grid-cols-[300px_auto] items-start">
        <ShopSidebar />
        <ShopProducts />
      </div>
      <Showroom />
      <Footer />
    </Entrance>
  );
};

export default Shop;
