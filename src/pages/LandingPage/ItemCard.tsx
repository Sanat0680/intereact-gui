import React, { useState } from "react";
import type { InventoryItem } from "../../model/user";

interface ItemCardProps {
  item: InventoryItem;
  handleAddToCart: (item: InventoryItem, quantity: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, handleAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const increment = () => {
    if (quantity < item.quantity) setQuantity((q) => q + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <div className="max-w-sm transition-all bg-white border border-gray-200 rounded-lg shadow hover:shadow-md">
      {/* Image Section */}
      <div className="flex items-center justify-center w-full bg-gray-100 rounded-t-lg h-36">
        <img
          src={
            item.imageUrl ||
            "https://placehold.co/100x100?text=Item&font=roboto"
          }
          alt={item.name}
          className="object-contain h-32"
        />
      </div>

      {/* Item Info */}
      <div className="flex flex-col justify-between h-full p-3">
        <h3 className="font-semibold text-black text-gray-800">{item.name}</h3>
        <p className="mt-0.5 text-sm text-gray-500">Price: ₹{item.price}</p>

        <p
          className={`text-sm font-medium mt-0.5 ${
            item.quantity > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {item.quantity > 0 ? `In stock: ${item.quantity}` : "Out of Stock"}
        </p>

        {/* Quantity Controls */}
        {item.quantity > 0 && (
          <div className="flex items-center mt-2 space-x-2">
            <button
              onClick={decrement}
              className="text-lg font-bold text-gray-700 bg-white border rounded w-7 h-7 hover:bg-gray-100"
            >
              −
            </button>
            <span className="px-2 text-sm font-medium">{quantity}</span>
            <button
              onClick={increment}
              className="text-lg font-bold text-gray-700 bg-white border rounded w-7 h-7 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(item, quantity)}
          disabled={item.quantity === 0}
          className={`mt-3 w-full py-1.5 text-center rounded-md font-semibold transition-all text-sm ${
            item.quantity === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {item.quantity === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
