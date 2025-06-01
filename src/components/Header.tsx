import Link from "next/link";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import Cookies from "js-cookie";
import { useCart } from "@/context/CartContext";
import { useAdmin } from "@/context/AdminContext";
import Image from "next/image";

interface HeaderProps {
  onSearchChange?: (term: string) => void;
}

export default function Header({ onSearchChange }: HeaderProps) {
  const { items } = useCart();
  const { isAdmin } = useAdmin();

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="w-full bg-[#00111A] flex items-center justify-between px-4 md:px-12 py-4 border-b border-[#1C232A]">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <Image src="/Assets/logo.svg" alt="Logo" width={197} height={30} />
        </Link>
      </div>
      <input
        type="text"
        placeholder="Busque por pratos ou ingredientes"
        className="flex-1 mx-6 max-w-lg rounded bg-[#0D1D25] border-none text-white placeholder-gray-400 px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
      />

      {isAdmin ? (
        <Link href="/features/addProducts">
          <button className="ml-4 bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary/90 transition">
            Novo produto
          </button>
        </Link>
      ) : (
        <div className="flex flex-row items-center">
          <Link href="/cart">
            <button className="ml-4 flex items-center gap-2 bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary/90 transition relative">
              <FiShoppingCart />
              <span>Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>
          <Link href="/orders">
            <button className="ml-4 bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary/90 transition">
              Pedidos (0)
            </button>
          </Link>
        </div>
      )}
      <button
        className="ml-4 text-[24px] text-white px-6 py-2 rounded font-semibold hover:bg-primary/90 transition"
        onClick={handleLogout}
      >
        <FiLogOut />
      </button>
    </header>
  );
}
