import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BasePage from "../../common/base";
import type { OrderItem } from "../../model/user";

const ThankyouPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { createdOrderresponse } = location.state || {};

  if (!createdOrderresponse) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-100">
        <h1 className="mb-4 text-3xl font-semibold text-red-600">
          ⚠️ No Order Found
        </h1>
        <p className="mb-6 text-gray-700">
          It looks like there was no order data. Please go back and complete
          your purchase.
        </p>
        <button
          onClick={() => navigate("/landingpage")}
          className="px-6 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700"
        >
          ⬅️ Return to Home
        </button>
      </div>
    );
  }

  return (
    <BasePage headerText="Thank You for Your Order!">
      <div className="min-h-screen p-6 base">
        <div className="max-w-3xl p-8 mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
          <h1 className="mb-2 text-3xl font-bold text-green-600">
            🎉 Thank You for Your Order!
          </h1>
          <p className="mb-4 text-gray-600">
            Your order has been successfully placed. Below are your order
            details.
          </p>

          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
            <div className="space-y-2">
              <p>
                <strong>🆔 Order ID:</strong> {createdOrderresponse.id}
              </p>
              <p>
                <strong>👤 Customer ID:</strong>{" "}
                {createdOrderresponse.customerId}
              </p>
              <p>
                <strong>🗓️ Order Date:</strong>{" "}
                {new Date(createdOrderresponse.orderDate).toLocaleString()}
              </p>
              <p>
                <strong>🚚 Delivery Date:</strong>{" "}
                {new Date(
                  createdOrderresponse.deliveryDate
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <strong>🏠 Shipping Address:</strong>
                <br />
                {createdOrderresponse.shippingAddress}
              </p>
              <p>
                <strong>💳 Payment Method:</strong>{" "}
                {createdOrderresponse.paymentMethod}
              </p>
              <p>
                <strong>📌 Status:</strong> {createdOrderresponse.status}
              </p>
            </div>
          </div>

          <h2 className="mb-4 text-2xl font-semibold text-indigo-700">
            🛍️ Ordered Items
          </h2>
          <div className="mb-6 divide-y divide-gray-200">
            {createdOrderresponse.items.map((item: OrderItem) => (
              <div key={item.productId} className="flex justify-between py-4">
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {item.productName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-lg font-semibold text-green-600">
                  ₹{(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end pt-4 border-t">
            <p className="text-xl font-bold text-gray-900">
              🧾 Total Amount: ₹{createdOrderresponse.totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/landingpage")}
              className="px-6 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700"
            >
              🔙 Back
            </button>
          </div>
        </div>
      </div>
    </BasePage>
  );
};

export default ThankyouPage;
