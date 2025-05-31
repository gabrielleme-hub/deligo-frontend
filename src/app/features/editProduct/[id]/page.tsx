"use client";

import MyImput from "@/components/myImput";
import { IngredientsItems } from "@/components/ingredientsItems";
import { api } from "@/config/api";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { urls } from "@/constants/api";
import Footer from "@/components/footer";
import Header from "@/components/Header";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  category: string;
}

export default function EditProducts() {
  const router = useRouter();
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>("");

  const categories = [
    { id: "1", name: "Refeições" },
    { id: "2", name: "Sobremesas" },
    { id: "3", name: "Bebidas" },
    { id: "4", name: "Lanches" },
  ];

  // Carregar os dados do produto quando o componente for montado ou o productId mudar
  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await api.get(
            `${urls.PRODUCTS.GET_PRODUCT_BY_ID}/${productId}`
          );
          console.log("response", response);
          const productData: Product = response.data;

          setImage(productData.image);
          setName(productData.name);
          setCategory(productData.category);
          setPrice(productData.price);
          setDescription(productData.description);
          setIngredients(productData.ingredients);
        } catch (error) {
          console.error("Erro ao carregar os dados do produto:", error);
          setFormError(
            "Não foi possível carregar os dados do produto. Tente novamente."
          );
        }
      }
    };

    fetchProduct();
  }, [productId]);

  const handleEditIngredient = () => {
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
      image,
      name,
      category,
      ingredients,
      price: Number(price),
      description,
      available: true,
    };

    try {
      await api.patch(`${urls.PRODUCTS.EDIT_PRODUCT}/${productId}`, payLoad, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Produto atualizado com sucesso!");
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Erro ao atualizar produto:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setFormError(`Erro: ${err.response.data.message}`);
      } else {
        setFormError("Ocorreu um erro ao salvar o produto. Tente novamente.");
      }
    }
  };

  const handleDeleteProduct = async () => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) {
      return;
    }

    try {
      await api.delete(`${urls.PRODUCTS.DELETE_PRODUCT}/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Produto excluído com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      setFormError("Ocorreu um erro ao excluir o produto. Tente novamente.");
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
                  <option key={cat.id} value={cat.name}>
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
              <div className=" bg-[#0D161B] flex p-2 gap-2  rounded-md">
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
                  onClick={handleEditIngredient}
                  onChange={(event) => {
                    setNewIngredient(event.target.value);
                    setFormError(null);
                  }}
                  placeholder="Adicionar ingrediente (ex: alface)"
                />
              </div>
            </div>
            <div className="w-[300px]">
              <MyImput
                placeholder="R$ 00,00"
                label="Preço"
                value={price}
                onChange={(e) => {
                  const valor = e.target.value.replace(",", ".");
                  const numero = Number(valor);
                  setPrice(isNaN(numero) ? 0 : numero);
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
              type="button"
              onClick={handleDeleteProduct}
              className="block bg-[#0D161B] text-white rounded-md px-6 py-3 font-semibold hover:bg-[#1a252b] transition text-lg"
            >
              Excluir prato
            </button>
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
