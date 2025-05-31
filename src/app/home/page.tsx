/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Header from "../../components/Header";
import Banner from "../../components/Banner";
import CategorySection from "../../components/CategorySection";
import { useMemo, useState } from "react";
import ProductModal from "../../components/ProductModal";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { urls } from "@/constants/api";
import Footer from "@/components/footer";

const CATEGORY_LABELS: Record<string, string> = {
  FOOD: "Refeições",
  DESSERT: "Sobremesas",
  DRINK: "Bebidas",
  SNACK: "Lanches",
};
const CATEGORY_ORDER = ["FOOD", "DESSERT", "DRINK", "SNACK"];

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      (await api.get(urls.PRODUCTS.GET_PRODUCTS_FIND_ALL)).data,
  });

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;

    const lowerSearch = searchTerm.toLowerCase();
    return products.filter(
      (p: any) =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.description.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, products]);

  const productsByCategory = CATEGORY_ORDER.map((cat) => ({
    key: cat,
    label: CATEGORY_LABELS[cat],
    products: filteredProducts.filter((p: any) => p.category === cat),
  }));

  return (
    <div className="min-h-screen bg-[#0D1D25] flex flex-col">
      <Header onSearchChange={setSearchTerm} />

      <main className="flex-1 px-[124px] md:px-[100px] pb-8">
        <Banner />
        {isLoading && <div className="text-[#E1E1E6]">Carregando...</div>}
        {productsByCategory.map(({ key, label, products }) =>
          products.length > 0 ? (
            <CategorySection
              key={key}
              title={label}
              products={products}
              onProductClick={setSelectedProduct}
            />
          ) : null
        )}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </main>

      <Footer />
    </div>
  );
}
