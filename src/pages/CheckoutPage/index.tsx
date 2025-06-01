import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ajaxHandler } from "../../common/ajaxHandler";
import BasePage from "../../common/base";
import type {
  BillingFormData,
  CreatedOrder,
  InventoryItem,
} from "../../model/user";
import BillingForm from "./BillingForm";
type PaymentIntentResponse = {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: "created" | "paid" | "attempted";
  attempts: number;
  created_at: number;
  offer_id: string | null;
  notes: any[];
};

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as { cartItems: InventoryItem[] };
  const cartItems = state?.cartItems || [];
  const [submittedData, setSubmittedData] = useState<BillingFormData | null>(
    null
  );
  //   const [createdOrderresponse, setOrderResponse] = useState<CreatedOrder>();
  const navigate = useNavigate();
  const methods = useForm<BillingFormData>();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const placeOrder = async () => {
    console.log("Placing order with data:", submittedData);
    console.log("Cart Items:", cartItems);
    const orderPayload: CreatedOrder = {
      customerId: 8709, //change it with actual customer id
      shippingAddress: `${submittedData?.address}, ${submittedData?.city}, ${submittedData?.pin}`,
      billingAddress: `${submittedData?.address}, ${submittedData?.city}, ${submittedData?.pin}`,
      status: "PENDING",
      paymentMethod: "CARD",
      notes: "Order placed via Intereact Page",
      orderDate: new Date().toISOString(),
      deliveryDate: new Date(
        Date.now() + 4 * 24 * 60 * 60 * 1000
      ).toISOString(), // +4 days
      totalAmount: totalPrice,
      items: cartItems.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    const createdOrder = await ajaxHandler<CreatedOrder>(
      "/api/create/order",
      "POST",
      orderPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    // setOrderResponse(createdOrder);

    console.log("Order Payload:", createdOrder);

    handleRazorpayPayment(createdOrder);
    navigate("/thankyoupage", {
      state: { createdOrderresponse: createdOrder },
    });
  };
  const handleRazorpayPayment = async (createdOrder: CreatedOrder) => {
    console.log("Handling Razorpay Payment for Order:", createdOrder);
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const rawResponse = await ajaxHandler<PaymentIntentResponse>(
      "/api/payments",
      "POST",
      {
        amount: totalPrice,
        currency: "INR",
        id: createdOrder.id, // Use the order ID from createdOrder
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log(rawResponse);
    const data = rawResponse;

    console.log(data);
    const options = {
      key: "rzp_test_Q9eR6BssIe2dpU",
      amount: data.amount,
      currency: data.currency,
      name: "Intereact",
      description: cartItems[0].name,
      order_id: data.id,
      handler: function (response: any) {
        toast.success("Payment Successful : " + response.razorpay_payment_id);
        console.log(`Payment ID: ${response.razorpay_payment_id}`);
        console.log(`Order ID: ${response.razorpay_order_id}`);
        console.log(`Signature: ${response.razorpay_signature}`);
      },
      prefill: {
        name: submittedData?.fullName || "Sanat Dash",
        email: submittedData?.email || "test@example.com",
        contact: submittedData?.phone,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          toast.error("Payment Unsuccessful !!");
          console.warn("User dismissed the payment popup.");
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", function (response: any) {
      toast.error("❌ Payment Failed");
      console.error("Payment Failed:", response.error);
      console.error("Error Code:", response.error.code);
      console.error("Error Description:", response.error.description);
      console.error("Error Source:", response.error.source);
      console.error("Error Step:", response.error.step);
      console.error("Error Reason:", response.error.reason);
    });
    rzp.open();
  };

  return (
    <BasePage headerText="Checkout">
      <div className="relative min-h-screen p-8 bg-white border rounded-lg shadow">
        <h2 className="mb-6 text-3xl font-bold text-indigo-700">
          🧾 Order Summary
        </h2>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-6">
            {!submittedData ? (
              <FormProvider {...methods}>
                <BillingForm onSubmitForm={(data) => setSubmittedData(data)} />
              </FormProvider>
            ) : (
              <div className="p-6 text-sm text-gray-800 bg-white border border-gray-200 shadow-sm rounded-xl">
                <h4 className="mb-2 text-lg font-semibold text-indigo-600">
                  📋 Billing Info
                </h4>
                <p className="mb-1">👤 {submittedData.fullName}</p>
                <p className="mb-1">📧 {submittedData.email}</p>
                <p className="mb-1">📞 {submittedData.phone}</p>
                <p className="mb-1">
                  🏠 {submittedData.address}, {submittedData.city} -{" "}
                  {submittedData.pin}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      methods.reset(submittedData);
                      setSubmittedData(null);
                    }}
                    className="p-2 text-indigo-600 bg-indigo-100 rounded-full hover:bg-indigo-200"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => setSubmittedData(null)}
                    className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex-1">
            {cartItems.length === 0 ? (
              <p className="text-lg text-gray-500">🛒 Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow"
                    >
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{item.price} x {item.quantity}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-indigo-600">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-6 mt-8 bg-gray-100 border border-gray-200 rounded-lg shadow-inner">
                  <p className="text-lg font-medium text-gray-700">
                    🧺 Total Items:{" "}
                    <span className="font-bold text-indigo-600">
                      {totalQuantity}
                    </span>
                  </p>
                  <p className="mt-2 text-lg font-medium text-gray-700">
                    💰 Total Price:{" "}
                    <span className="font-bold text-green-600">
                      ₹{totalPrice}
                    </span>
                  </p>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={!submittedData}
                  className={`w-full py-3 mt-6 font-semibold text-white rounded-md shadow-md transition ${
                    submittedData
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  💳 Pay Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </BasePage>
  );
};

export default CheckoutPage;
