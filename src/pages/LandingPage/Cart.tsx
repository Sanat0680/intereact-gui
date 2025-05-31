import React from "react";
import type { InventoryItem } from "../../model/user";

interface CartProps {
  items: InventoryItem[];
  goToCart: (cartItems: InventoryItem[]) => void;
}

const Cart: React.FC<CartProps> = ({ items, goToCart }) => {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );

  return (
    <div className="flex flex-col h-full max-w-2xl p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="pb-3 mb-3 text-xl font-semibold text-gray-800 border-b">
        Your Cart
      </h2>

      {items.length === 0 ? (
        <div className="text-sm text-center text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="pr-1 mb-3 space-y-2 overflow-y-auto max-h-64">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 border border-gray-200 rounded-md shadow-sm bg-gray-50"
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={
                      item.imageUrl ||
                      "https://placehold.co/100x100?text=Item&font=roboto"
                    }
                    alt={item.name}
                    className="object-contain w-10 h-10 bg-white border rounded"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      {item.name}
                    </div>
                    {item.quantity && item.quantity > 1 && (
                      <div className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700 min-w-[50px] text-right">
                  ₹{item.price * (item.quantity ?? 1)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between py-2 text-base font-semibold text-gray-800 border-t">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            className="w-full py-2 mt-3 text-sm font-semibold text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700"
            onClick={() => goToCart(items)}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
