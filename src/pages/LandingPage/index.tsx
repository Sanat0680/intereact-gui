import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ajaxHandler } from "../../common/ajaxHandler";
import BasePage from "../../common/base";
import Spinner from "../../common/widgets";
import type { InventoryItem } from "../../model/user";
import Cart from "./Cart";
import ItemCard from "./ItemCard";

const LandingPage: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [cartItems, setCartItems] = useState<InventoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await ajaxHandler<InventoryItem[]>(
          "/api/get/inventories",
          "GET"
        );
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const goToCart = (items: InventoryItem[]) => {
    console.log("Cart Items:", items);
    navigate("/checkoutpage", { state: { cartItems } });
  };

  const handleAddToCart = (item: InventoryItem, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((prevCart) => {
      const existingItem = prevCart.find((ci) => ci.id === item.id);
      if (existingItem) {
        return prevCart.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  const allOutOfStock =
    Array.isArray(items) &&
    items.length > 0 &&
    items.every((item) => item.quantity === 0);

  return (
    <BasePage headerText={"Welcome"}>
      {items.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
          <div className="p-4">Fetching Items ..!!</div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 p-6 bg-white shadow-lg rounded-xl lg:flex-row h-[80vh]">
          {/* Inventory Section */}
          <div className="flex-1 pr-4 overflow-auto">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              🛍️ Inventory
            </h2>

            {allOutOfStock ? (
              <p className="text-lg font-medium text-center text-red-600">
                ❌ All items are out of stock.
              </p>
            ) : (
              <div className="flex flex-wrap justify-center gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] flex-grow"
                  >
                    <ItemCard item={item} handleAddToCart={handleAddToCart} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Section */}
          <div className=" lg:w-80 bg-gray-100 p-6 sticky top-4 self-start h-[73vh] overflow-auto rounded-lg ">
            <Cart items={cartItems} goToCart={goToCart} />
          </div>
        </div>
      )}
    </BasePage>
  );
};

export default LandingPage;
