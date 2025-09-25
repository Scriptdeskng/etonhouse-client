/* eslint-disable @next/next/no-img-element */
import { useGetUserOrders } from "@/services/profile.service";
import { IoEyeOutline as EyeIcon } from "react-icons/io5";
import { LiaShoppingBagSolid as ShoppingBagIcon } from "react-icons/lia";
import Link from "next/link";
import { FaMinusSquare } from "react-icons/fa";

const Orders = () => {
  const { data: orders, isLoading } = useGetUserOrders();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "placed":
        return "bg-[#2D54D3] text-white";
      case "processing":
        return "bg-yellow-500 text-white";
      case "shipped":
        return "bg-black-300 text-white";
      case "delivered":
        return "bg-gray-300 text-white";
      case "cancelled":
        return "bg-red-100 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#333333]">Orders</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse">Loading your orders...</div>
        </div>
      </div>
    );
  }

  const ordersList = orders?.results || [];

  if (ordersList.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#333333]">Orders</h2>
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <ShoppingBagIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No orders yet
          </h3>
          <p className="text-gray-500 mb-6">
            When you place your first order, it will appear here.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2 bg-black-400 text-white rounded-full"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const orderItems = ordersList.flatMap((order: any) =>
    order.items.map((item: any) => ({
      ...item,
      order_number: order.order_number,
      order_id: order.id,
      order_date: order.created_at,
      order_status: order.status,
      order_status_display: order.status_display,
      estimated_delivery: order.estimated_delivery,
    }))
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-black-400">
        Orders ({orderItems.length} items)
      </h2>

      <div className="bg-white rounded-lg sm:shadow-lg p-2 sm:p-6">
        <div className="hidden xl:flex items-center text-black-100 pb-10">
          <div className="flex items-center gap-1 pb-5 w-[30%] border-b-2 border-b-black-100">
            <span className="text-black">
              <FaMinusSquare />
            </span>
            <span>Product Name</span>
          </div>

          <div className="pb-5 w-[15%] text-center border-b-2 border-b-black-100">
            Date
          </div>

          <div className="pb-5 w-[20%] text-center border-b-2 border-b-black-100">
            Total Amount
          </div>

          <div className="pb-5 w-[15%] text-center border-b-2 border-b-black-100">
            Status
          </div>

          <div className="pb-5 w-[20%] text-center border-b-2 border-b-black-100">
            Action
          </div>
        </div>

        <div className="space-y-4">
          {orderItems.map((item: any, index: number) => (
            <div
              key={`${item.order_id}-${item.id}-${index}`}
              className="bg-white border border-gray-200 rounded-lg lg:border-0"
            >
              <div className="flex flex-col xl:flex-row gap-4 px-3 py-2 sm:p-4 lg:gap-0 xl:px-0 lg:py-4">
                <div className="flex items-center gap-3 xl:w-[30%] lg:pr-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex-shrink-0">
                    <img
                      src={item.product_variant?.product?.featured_image || "/placeholder-image.jpg"}
                      alt={item.product_name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 line-clamp-2 flex-1">
                    {item.product_name}
                  </h3>
                </div>

                <div className="flex flex-row items-center justify-between xl:hidden">
                  <div>
                    {new Date(item.order_date).toLocaleDateString()}
                  </div>
                  <p className="font-medium text-gray-900">
                    ₦{parseFloat(item.total_price || item.price).toLocaleString()}
                  </p>
                </div>

                <div className="hidden xl:flex lg:items-center xl:justify-center xl:w-[15%] xl:px-2">
                  <span className="text-gray-900">
                    {new Date(item.order_date).toLocaleDateString()}
                  </span>
                </div>

                <div className="hidden xl:flex xl:items-center xl:justify-center xl:w-[20%] xl:px-2">
                  <p className="font-medium text-gray-900">
                    ₦{parseFloat(item.total_price || item.price).toLocaleString()}
                  </p>
                </div>

                <div className="hidden xl:flex xl:items-center xl:justify-center xl:w-[20%] xl:px-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.order_status
                    )}`}
                  >
                    {item.order_status_display || item.order_status}
                  </span>
                </div>

                <div className="hidden xl:flex xl:items-center xl:justify-center xl:w-[15%] xl:px-2">
                  <Link
                    href={`/track/${item.order_id}`}
                    className="inline-flex items-center text-[#2D54D3] underline text-sm hover:text-[#2D54D3]/80 transition-colors"
                  >
                    Track Order
                  </Link>
                </div>

                <div className="flex flex-row items-center justify-between mt-2 gap-2 xl:hidden">
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.order_status
                    )}`}
                  >
                    {item.order_status_display || item.order_status}
                  </div>

                  <Link
                    href="/track"
                    className="inline-flex items-center text-[#2D54D3] underline text-sm hover:text-[#2D54D3]/80 transition-colors"
                  >
                    Track Order
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;