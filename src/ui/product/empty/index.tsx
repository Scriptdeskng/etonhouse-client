import Button from "@/utils/button";

const EmptyProducts = ({ clearFilters }: { clearFilters: () => void }) => {
  return (
    <div className="col-span-3 w-full flex flex-col items-center justify-center py-16 lg:py-32 px-4 text-center">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        No products found
      </h2>

      <p className="text-gray-500 mb-6">
        Try adjusting or clearing your filters to find products.
      </p>

      <Button
        text="Reset Filters"
        type="button"
        handleClick={clearFilters}
        className="bg-[#333333] text-white !rounded-none !text-base !h-11 !py-0 flex items-center justify-center w-full sm:max-w-[280px]"
      />
    </div>
  );
};

export default EmptyProducts;
