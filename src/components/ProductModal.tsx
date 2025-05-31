import Image from "next/image";
import { useState } from "react"; // Importar useState para o controle de quantidade
import MyButtonText from "./myButtonText";
import { useCart } from "@/context/CartContext";
import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/navigation";

// Certifique-se de que esta interface corresponde à forma dos seus dados de produto
interface Product {
  id: string; // Assumindo que você tem um ID para o produto
  name: string;
  description: string;
  price: number;
  image: string; // URL da imagem do produto
  ingredients: string[]; // Array de strings para os ingredientes
}

interface ProductModalProps {
  product: Product | null; // Agora product é do tipo Product ou null
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1); // Estado para controlar a quantidade
  const { isAdmin } = useAdmin();

  if (!product) return null;

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1)); // Garante que a quantidade não seja menor que 1
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleEditProduct = () => {
    router.push(`/features/editProduct/${product.id}`);
  };

  const totalPrice = (product.price * quantity).toFixed(2); // Calcula o preço total

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="bg-[#1C232A] rounded-2xl w-full max-w-sm md:max-w-4xl relative flex flex-col md:flex-row items-center md:items-start gap-8 p-8">
        <MyButtonText onClose={onClose} message="Fechar" />
        <div className="flex-shrink-0 mt-12 md:mt-0">
          <Image
            width={390}
            height={390}
            src={product.image}
            alt={product.name}
            className="object-cover rounded-full w-[390px] h-[390px]"
          />
        </div>
        <div className="flex-grow flex flex-col justify-between items-start text-start gap-6 py-10">
          <h3 className="text-4xl font-bold text-[#E1E1E6] mb-2">
            {product.name}
          </h3>
          <p className="text-[#E1E1E6] text-lg mb-4 leading-relaxed max-w-lg">
            {product.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
            {product.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-[#2C3742] text-[#E1E1E6] text-sm px-4 py-1 rounded-md"
              >
                {ingredient}
              </span>
            ))}
          </div>
          {isAdmin ? (
            <button
              className="bg-[#750310] text-white rounded-md px-6 py-3 font-medium font-poppins hover:bg-[#920718] transition text-[14px] flex items-center gap-2"
              onClick={() => {
                handleEditProduct();
                onClose();
              }}
            >
              Editar Prato
            </button>
          ) : (
            <div className="flex items-center gap-6 mt-auto">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDecreaseQuantity}
                  className="text-[#E1E1E6] text-[20px] font-roboto  px-3 py-1 font-bold"
                >
                  -
                </button>
                <span className="text-[#E1E1E6] text-[20px] font-roboto font-bold">
                  {String(quantity).padStart(2, "0")}
                </span>{" "}
                <button
                  onClick={handleIncreaseQuantity}
                  className="text-[#E1E1E6] text-[20px] font-roboto  px-3 py-1 font-bold"
                >
                  +
                </button>
              </div>
              <button
                className="bg-[#750310] text-white rounded-md px-6 py-3 font-medium font-poppins hover:bg-[#920718] transition text-[14px] flex items-center gap-2"
                onClick={() => {
                  addItem({
                    productId: product.id,
                    name: product.name,
                    price: Number(product.price),
                    quantity,
                  });
                  onClose();
                }}
              >
                Incluir no carrinho · R$ {totalPrice}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
