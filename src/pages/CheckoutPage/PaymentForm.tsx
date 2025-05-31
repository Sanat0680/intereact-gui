import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

interface PaymentFormProps {
  clientSecret: string;
  onPaymentSuccess: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  clientSecret,
  onPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details not found.");
      return;
    }

    setProcessing(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setError(`Payment failed: ${result.error.message}`);
      setProcessing(false);
    } else if (result.paymentIntent?.status === "succeeded") {
      setSucceeded(true);
      setProcessing(false);
      setError(null);
      onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement />
      {error && <div className="text-sm text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={processing || succeeded}
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md disabled:opacity-50"
      >
        {processing ? "Processing..." : "💳 Pay Now"}
      </button>
      {succeeded && (
        <p className="mt-2 text-green-600">✅ Payment Successful!</p>
      )}
    </form>
  );
};

export default PaymentForm;
