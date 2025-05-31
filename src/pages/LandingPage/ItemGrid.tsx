import React from "react";
import type { InventoryItem } from "../../model/user";
import ItemCard from "./ItemCard";

interface ItemGridProps {
  items: InventoryItem[];
  handleAddToCart: (item: InventoryItem) => void;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, handleAddToCart }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex-shrink-0 w-full sm:w-[48%] md:w-[31%] lg:w-[23%]"
        >
          <ItemCard item={item} handleAddToCart={handleAddToCart} />
        </div>
      ))}
    </div>
  );
};

export default ItemGrid;
