"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { api } from "@/services/api";
import { urls } from "@/constants/api";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center m-auto">
      <Image src="/Assets/logo.svg" alt="Logo" width={324} height={50} />
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post(urls.USER.LOGIN, formData);
      console.log("Login response:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        Cookies.set("token", response.data.token);
        if (response.data.user?.type) {
          localStorage.setItem("role", response.data.user.type.toUpperCase());
        }
        router.push("/home");
      }
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data
      ) {
        setError(
          (err.response.data as { message?: string }).message ||
            "Erro ao fazer login"
        );
      } else {
        setError("Erro ao fazer login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0D1D25]">
      {/* Esquerda: Logo */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <Logo />
      </div>
      {/* Direita: Card de login */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-[#1C232A] rounded-2xl p-10 shadow-lg flex flex-col">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
            Entre na sua conta
          </h2>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md bg-[#0D1D25] border-none text-white placeholder-gray-400 px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Exemplo: exemplo@exemplo.com.br"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-1"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-md bg-[#0D1D25] border-none text-white placeholder-gray-400 px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="No mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="h-2">
              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-md py-3 mt-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <div className="mt-8 text-center">
            <Link
              href="/register"
              className="text-gray-300 text-sm hover:underline"
            >
              Criar uma nova conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
