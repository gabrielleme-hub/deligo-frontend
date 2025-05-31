/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import MyButtonText from "@/components/myButtonText";

function formatStatus(status: string) {
  switch (status) {
    case "PAID":
      return "Pago";
    case "PENDING":
      return "Pendente";
    default:
      return status;
  }
}

function formatPaymentMethod(method: string) {
  switch (method) {
    case "BOLETO":
      return "Boleto Bancário";
    case "CREDIT_CARD":
      return "Cartão de Crédito";
    case "PIX":
      return "PIX";
    default:
      return method;
  }
}

export default function OrdersPage() {
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => (await api.get("/orders")).data,
  });

  return (
    <div className="min-h-screen bg-[#0D1D25] py-10 px-4 md:px-12">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-white mb-8">Meus Pedidos</h1>
        <MyButtonText onClose={() => window.history.back()} message="Voltar" />
      </div>
      {isLoading && <div className="text-white">Carregando...</div>}
      {error && <div className="text-red-400">Erro ao carregar pedidos.</div>}
      {orders.length === 0 && !isLoading && (
        <div className="text-gray-400">Nenhum pedido encontrado.</div>
      )}
      <div className="flex flex-col gap-8">
        {orders.map((order: any) => (
          <div key={order.id} className="bg-[#1C232A] rounded-xl p-6 shadow-md">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
              <div>
                <span className="text-gray-400 text-sm">Pedido:</span>
                <span className="text-white font-semibold ml-2">
                  {order.id}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Data:</span>
                <span className="text-white ml-2">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Status:</span>
                <span
                  className={`ml-2 font-semibold ${
                    order.status === "PAID"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {formatStatus(order.status)}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Total:</span>
                <span className="text-primary font-bold ml-2">
                  R$ {Number(order.totalAmount).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="mb-2">
              <span className="text-gray-400 text-sm">Pagamento:</span>
              <span className="ml-2 text-white">
                {formatPaymentMethod(order.paymentMethod)}
              </span>
              {order.paymentMethod === "BOLETO" && (
                <div className="text-gray-300 text-xs mt-1">
                  Linha digitável: {order.paymentDetails}
                </div>
              )}
              {order.paymentMethod === "CREDIT_CARD" && (
                <div className="text-gray-300 text-xs mt-1">
                  Status: {order.paymentDetails}
                </div>
              )}
              {order.paymentMethod === "PIX" &&
                order.paymentDetails &&
                order.paymentDetails.startsWith("data:image") && (
                  <div className="mt-2">
                    <span className="text-gray-300 text-xs block mb-1">
                      QR Code:
                    </span>
                    <img
                      src={order.paymentDetails}
                      alt="QR Code PIX"
                      className="w-32 h-32 bg-white rounded"
                    />
                  </div>
                )}
            </div>
            {order.billingAddress && (
              <div className="mb-2">
                <span className="text-gray-400 text-sm">
                  Endereço de cobrança:
                </span>
                <span className="ml-2 text-white">
                  {(() => {
                    try {
                      const addr = JSON.parse(order.billingAddress);
                      return `${addr.street}, ${addr.complement}, ${addr.neighborhood}, ${addr.city} - ${addr.state}, ${addr.zipCode}`;
                    } catch {
                      return order.billingAddress;
                    }
                  })()}
                </span>
              </div>
            )}
            <div>
              <span className="text-gray-400 text-sm">Itens:</span>
              {order.items.length === 0 ? (
                <span className="ml-2 text-gray-400">
                  Nenhum item neste pedido.
                </span>
              ) : (
                <ul className="ml-4 mt-2">
                  {order.items.map((item: any, idx: number) => (
                    <li key={idx} className="text-white">
                      {item.quantity}x{" "}
                      {item.product?.name
                        ? item.product.name
                        : `Produto ID: ${item.productId}`}
                      <span className="text-gray-400 ml-2">
                        R$ {Number(item.unitPrice).toFixed(2)} cada | Total: R${" "}
                        {Number(item.totalPrice).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
