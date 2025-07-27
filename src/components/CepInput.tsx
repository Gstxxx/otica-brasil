"use client";
import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

interface CepInputProps {
  value: string;
  onChange: (cep: string) => void;
  onAddressFound: (address: {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
  }) => void;
  error?: string;
  required?: boolean;
}

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export default function CepInput({
  value,
  onChange,
  onAddressFound,
  error,
  required = false,
}: CepInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const formatCep = (cep: string) => {
    const cleaned = cep.replace(/\D/g, "");
    return cleaned.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawCep = e.target.value.replace(/\D/g, "");
    const formattedCep = formatCep(rawCep);
    onChange(formattedCep);

    // Buscar endereço quando CEP estiver completo
    if (rawCep.length === 8) {
      setIsValidating(true);
      fetchAddress(rawCep);
    }
  };

  const fetchAddress = async (cep: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data: ViaCepResponse = await response.json();

      if (!data.erro) {
        onAddressFound({
          cep: data.cep,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        });
      } else {
        console.warn("CEP não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setIsLoading(false);
      setIsValidating(false);
    }
  };

  const handleSearchClick = () => {
    const rawCep = value.replace(/\D/g, "");
    if (rawCep.length === 8) {
      setIsValidating(true);
      fetchAddress(rawCep);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        CEP
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <div className="flex">
          <input
            type="text"
            value={value}
            onChange={handleCepChange}
            placeholder="00000-000"
            maxLength={9}
            className={`flex-1 px-3 py-2 border rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              error ? "border-red-300" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={handleSearchClick}
            disabled={isLoading || value.replace(/\D/g, "").length !== 8}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>
        </div>

        {isValidating && !isLoading && (
          <div className="absolute right-12 top-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      <p className="mt-1 text-xs text-gray-500">
        Digite o CEP para preenchimento automático do endereço
      </p>
    </div>
  );
}
