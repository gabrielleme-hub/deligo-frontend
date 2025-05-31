/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAdmin } from "@/context/AdminContext";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: any;
  onClick: () => void;
}
export default function ProductCard({ product, onClick }: ProductCardProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isAdmin } = useAdmin();

  const handleEditProduct = () => {
    router.push(`/features/editProduct/${product.id}`);
  };
  return (
    <div
      className="bg-gradient-to-b from-[#000A0F45] to-[#000A0FFF] rounded-[8px] p-6  w-[331px] h-[462px] flex flex-col items-center justify-between relative cursor-pointer hover:scale-105 transition"
      onClick={onClick}
    >
      {isAdmin ? (
        <button
          className="absolute top-5 right-5 text-[#E1E1E6] text-[24px] hover:text-primary z-10"
          onClick={(e) => {
            e.stopPropagation();
            handleEditProduct();
          }}
        >
          <FaRegEdit />
        </button>
      ) : (
        <button
          className="absolute top-3 right-3 text-[#E1E1E6] text-[24px] hover:text-primary z-10"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {product.favorite ? "♥" : "♡"}
        </button>
      )}
      <Image
        width={44}
        height={44}
        src={product.image}
        alt={product.name}
        className="w-44 h-44 object-cover rounded-full mb-3"
      />
      <h4 className="text-[#E1E1E6] text-[24px] font-poppins font-bold text-center">
        {product.name}
      </h4>
      <p className="text-[#E1E1E6] text-[14px] font-roboto text-center">
        {product.description}
      </p>
      <span className="text-[#82F3FF] font-roboto text-[32px] mb-2">
        R$ {Number(product.price).toFixed(2)}
      </span>
      {!isAdmin && (
        <div className="flex items-center p-3 gap-4 w-full">
          <button
            className="text-white text-[20px] font-roboto font-bold"
            onClick={(e) => {
              e.stopPropagation();
              setQuantity((q) => Math.max(1, q - 1));
            }}
          >
            -
          </button>
          <span className="text-white text-[20px] font-roboto font-bold">
            {quantity.toString().padStart(2, "0")}
          </span>
          <button
            className="text-white text-[20px] font-roboto font-bold"
            onClick={(e) => {
              e.stopPropagation();
              setQuantity((q) => q + 1);
            }}
          >
            +
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem({
                productId: product.id,
                name: product.name,
                price: Number(product.price),
                quantity,
              });
            }}
            className="w-full bg-primary text-white rounded py-2 font-semibold hover:bg-primary/90 transition"
          >
            Incluir
          </button>
        </div>
      )}
    </div>
  );
}
