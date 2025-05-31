"use client";

import MyImput from "@/components/myImput";
import { IngredientsItems } from "@/components/ingredientsItems";
import { api } from "@/services/api";
import { urls } from "@/constants/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaBrazilianRealSign } from "react-icons/fa6";

export default function AddProducts() {
  const router = useRouter();

  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>("");

  const categories = [
    { id: "FOOD", name: "Refeições" },
    { id: "DESSERT", name: "Sobremesas" },
    { id: "DRINK", name: "Bebidas" },
    { id: "SNACK", name: "Lanches" },
  ];

  const handleAddIngredient = () => {
    if (
      newIngredient.trim() !== "" &&
      !ingredients.includes(newIngredient.trim())
    ) {
      setIngredients((prevstate) => [...prevstate, newIngredient.trim()]);
      setNewIngredient("");
    } else if (newIngredient.trim() === "") {
      setFormError("O ingrediente não pode estar vazio.");
    } else {
      setFormError("Ingrediente já adicionado.");
    }
  };

  const handleRemoveIngredient = (ingredientRemove: string) => {
    setIngredients((state) =>
      state.filter((ingredient) => ingredient !== ingredientRemove)
    );
  };

  const handleSaveProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    setFormError(null);

    if (
      !image ||
      !name ||
      !category ||
      price <= 0 ||
      !description ||
      ingredients.length === 0
    ) {
      setFormError(
        "Por favor, preencha todos os campos e adicione ao menos um ingrediente."
      );
      return;
    }

    const payLoad = {
      image: image || null,
      name,
      category,
      ingredients,
      price: Number(price),
      description,
      available: true,
    };

    try {
      await api.post(urls.PRODUCTS.CREATE_PRODUCT, payLoad);

      setImage("");
      setName("");
      setCategory("");
      setIngredients([]);
      setPrice(0);
      setDescription("");
      setNewIngredient("");

      alert("Produto adicionado com sucesso!");
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Erro ao criar produto:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setFormError(`Erro: ${err.response.data.message}`);
      } else {
        setFormError("Ocorreu um erro ao salvar o produto. Tente novamente.");
      }
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <Header />
      <div className="bg-[#000A0F] flex flex-col px-[123px] pt-10 pb-[100px] mx-auto h-screen">
        <button
          onClick={handleGoBack}
          className="text-[#C4C4CC] hover:text-white text-xl flex items-center gap-2 cursor-pointer self-start mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          voltar
        </button>

        <h1 className="text-4xl font-bold text-[#E1E1E6] mb-8 text-start">
          Editar prato
        </h1>

        <form onSubmit={handleSaveProduct}>
          <div className="grid grid-cols-3 justify-center items-center gap-6 mb-6">
            <MyImput
              icon={<FaCloudUploadAlt />}
              placeholder="Selecione a imagem do prato"
              label="Imagem do prato (URL)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {/* Input de Nome */}
            <MyImput
              placeholder="Ex.: Salada Ceasar"
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Select de Categoria */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-gray-300">
                Categoria
              </label>
              <select
                id="category"
                name="category"
                className="rounded bg-[#0D161B] border-none text-[#7C7C8A] h-[48px] px-4 py-3 "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Selecione a categoria
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className=" flex flex-row items-center justify-center gap-8">
            <div className="w-full">
              <label htmlFor="ingredients" className="text-gray-300">
                Ingredientes
              </label>
              <div className=" bg-[#0D161B] flex flex-row items-center p-2 gap-2 rounded-md">
                {ingredients.map((ingredient, index) => (
                  <IngredientsItems
                    key={String(index)}
                    isNew={false}
                    value={ingredient}
                    onClick={() => handleRemoveIngredient(ingredient)}
                  />
                ))}
                <IngredientsItems
                  isNew={true}
                  value={newIngredient}
                  onClick={handleAddIngredient}
                  onChange={(event) => {
                    setNewIngredient(event.target.value);
                    setFormError(null);
                  }}
                  placeholder="Adicionar ingredientes"
                />
              </div>
            </div>
            <div className="w-[300px]">
              <MyImput
                icon={<FaBrazilianRealSign />}
                placeholder="00,00"
                label="Preço"
                value={price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  const numericValue = parseFloat(rawValue) / 100;

                  setPrice(isNaN(numericValue) ? 0 : numericValue);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <label htmlFor="description" className="text-gray-300 ">
              Descrição
            </label>
            <textarea
              className="w-full h-[172px] rounded-md bg-[#0D161B] border-none text-[#7C7C8A] font-roboto placeholder-[#7C7C8A] px-4 py-3 "
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {formError && (
            <span className="text-red-500 text-[14px] mt-4 block text-center">
              {formError}
            </span>
          )}
          <div className="flex flex-row gap-8 justify-end items-end mt-8">
            <button
              type="submit"
              className="block bg-[#750310] text-white rounded-md px-6 py-3 font-semibold hover:bg-[#920718] transition text-lg"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
