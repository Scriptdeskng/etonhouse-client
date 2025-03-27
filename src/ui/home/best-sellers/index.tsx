import ProductSlider from "@/components/slider";
import PageTitle from "@/utils/page-title";
import Tabs from "@/utils/tabs";
import { useState } from "react";

const BestSellers = () => {
  const [active, setActive] = useState<string>("Chair");

  return (
    <PageTitle title="BESTSELLERS" background="bg-grey-100">
      <Tabs active={active} setActive={setActive} />

      <ProductSlider />
    </PageTitle>
  );
};

export default BestSellers;
