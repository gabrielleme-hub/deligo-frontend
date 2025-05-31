"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { useState } from "react";
import Image from "next/image";
import MyButtonText from "@/components/myButtonText";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("PIX");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (items.length === 0) return;
    try {
      await api.post("/orders", {
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
        paymentMethod,
      });
      clearCart();
      alert("Pedido realizado com sucesso!");
      router.push("/orders");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Erro ao finalizar pedido");
    }
  };
  return (
    <div className="min-h-screen bg-[#0D1D25] py-10 px-4 md:px-12">
      <div className="flex flex-row justify-between items-center ">
        <h1 className="text-3xl font-bold text-white mb-8">
          Carrinho de Compras
        </h1>
        <MyButtonText onClose={() => router.back()} message="Voltar" />
      </div>
      {items.length === 0 ? (
        <div className="text-gray-400">Seu carrinho está vazio.</div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-2 ">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="bg-[#1C232A] rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <span className="text-white font-semibold">
                      {item.name}
                    </span>
                    <span className="text-gray-400 ml-2">
                      R$ {item.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="px-2 text-white"
                    >
                      -
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="px-2 text-white"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-4 text-red-400"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-start text-white text-xl font-bold mt-4">
                Total: R$ {total.toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col w-[700px] border-2 border-[#76797B] p-4 gap-4">
              <label className="text-white font-medium" htmlFor="paymentMethod">
                Pagamento
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="rounded bg-[#0D161B] border-none text-[#7C7C8A] w-full h-[48px] px-4 py-3"
              >
                <option value="PIX">PIX</option>
                <option value="CREDIT_CARD">Cartão de Crédito</option>
                <option value="BOLETO">Boleto Bancário</option>
              </select>

              {/* Conteúdo visual do método de pagamento */}
              {paymentMethod === "PIX" && (
                <div className="mt-4 flex flex-col items-center">
                  <p className="text-white mb-2">
                    Escaneie o QR Code para pagar via PIX
                  </p>
                  <Image
                    width={200}
                    height={200}
                    src={"/Assets/images/qr_code.png"}
                    alt="QR Code PIX"
                    className=" bg-white rounded"
                  />
                </div>
              )}

              {paymentMethod === "CREDIT_CARD" && (
                <div className="mt-4 flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Número do Cartão"
                    className="p-3 rounded bg-[#0D161B] text-white border border-gray-700"
                  />
                  <input
                    type="text"
                    placeholder="Nome no Cartão"
                    className="p-3 rounded bg-[#0D161B] text-white border border-gray-700"
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Validade (MM/AA)"
                      className="p-3 rounded bg-[#0D161B] text-white border border-gray-700 flex-1"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      className="p-3 rounded bg-[#0D161B] text-white border border-gray-700 w-24"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "BOLETO" && (
                <p className="mt-4 text-white">
                  Você receberá o boleto para pagamento por e-mail.
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-primary/90 transition"
          >
            Finalizar Pedido
          </button>
        </div>
      )}
    </div>
  );
}
