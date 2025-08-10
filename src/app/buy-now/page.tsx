"use client";
import React, { useState, useEffect } from "react";
import type { LensType } from "@prisma/client";
import PurchaseModal from "@/components/PurchaseModal";

// Tipo simplificado para dados estáticos
type StaticLensType = Omit<LensType, "basePrice"> & {
  basePrice: string;
};

// Dados estáticos como fallback
const staticLensTypes: StaticLensType[] = [
  {
    id: "1",
    name: "Lente Monofocal",
    description: "Lente para correção de miopia, hipermetropia ou astigmatismo",
    basePrice: "150",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Lente Bifocal",
    description: "Lente com duas distâncias focais - longe e perto",
    basePrice: "250",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Lente Multifocal/Progressiva",
    description: "Lente progressiva para todas as distâncias",
    basePrice: "350",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Lente Transitions",
    description: "Lente fotocromática que escurece na luz solar",
    basePrice: "200",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Lente Antirreflexo",
    description: "Lente com tratamento antirreflexo para melhor visão",
    basePrice: "100",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Lente Blue Light",
    description: "Lente com filtro para luz azul de dispositivos eletrônicos",
    basePrice: "120",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function BuyNowPage() {
  const [lensTypes, setLensTypes] = useState<LensType[] | StaticLensType[]>(
    staticLensTypes
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLenses, setSelectedLenses] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchLensTypes();
  }, []);

  const fetchLensTypes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/lens-types");
      const data = await response.json();

      if (data.success && data.data && data.data.lensTypes) {
        setLensTypes(data.data.lensTypes);
      } else {
        console.warn("Usando dados estáticos como fallback");
      }

      setIsLoading(false);
    } catch (err) {
      console.warn(
        "Erro ao carregar dados dinâmicos, usando dados estáticos:",
        err
      );
      setIsLoading(false);
    }
  };

  const handleLensToggle = (lensId: string) => {
    setSelectedLenses((prev) =>
      prev.includes(lensId)
        ? prev.filter((id) => id !== lensId)
        : [...prev, lensId]
    );
  };

  const calculateTotal = () => {
    return selectedLenses.reduce((total, lensId) => {
      const lens = lensTypes.find((l) => l.id === lensId);
      return total + (lens ? parseFloat(lens.basePrice.toString()) : 0);
    }, 0);
  };

  const getSelectedLensesData = () => {
    return selectedLenses.map((lensId) => {
      const lens = lensTypes.find((l) => l.id === lensId);
      return {
        id: lensId,
        name: lens?.name || "",
        basePrice: lens?.basePrice.toString() || "0",
      };
    });
  };

  const handlePurchaseSubmit = async (data: any) => {
    try {
      console.log("Dados do pedido:", { ...data, selectedLenses });

      // Aqui você pode implementar a lógica de envio do pedido
      // Por enquanto, vamos simular um sucesso
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Pedido enviado com sucesso! Entraremos em contato em breve.");
      setSelectedLenses([]);
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao processar pedido:", error);
      alert("Erro ao processar pedido. Tente novamente.");
    }
  };

  const handleBuyNow = () => {
    if (selectedLenses.length === 0) {
      alert("Selecione pelo menos um tipo de lente");
      return;
    }
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando tipos de lentes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Erro ao carregar
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchLensTypes}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comprar Lentes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha suas lentes e finalize seu pedido. Nossa equipe
            especializada cuidará de tudo para você.
          </p>
        </div>

        {/* Lista de Lentes */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Tipos de Lentes Disponíveis
            </h2>
            {isLoading && (
              <div className="flex items-center text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Atualizando...
              </div>
            )}
          </div>

          <div className="grid gap-4">
            {lensTypes.map((lens) => (
              <div
                key={lens.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedLenses.includes(lens.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handleLensToggle(lens.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedLenses.includes(lens.id)}
                      onChange={() => handleLensToggle(lens.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {lens.name}
                      </h3>
                      <p className="text-gray-600 mt-1">{lens.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900">
                      R${" "}
                      {parseFloat(lens.basePrice.toString())
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo e Botão de Compra */}
          <div className="mt-8 border-t pt-6">
            {selectedLenses.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Lentes Selecionadas
                </h3>
                <div className="space-y-2">
                  {selectedLenses.map((lensId) => {
                    const lens = lensTypes.find((l) => l.id === lensId);
                    return (
                      <div
                        key={lensId}
                        className="flex justify-between text-sm"
                      >
                        <span>{lens?.name}</span>
                        <span>
                          R${" "}
                          {parseFloat(lens?.basePrice.toString() || "0")
                            .toFixed(2)
                            .replace(".", ",")}
                        </span>
                      </div>
                    );
                  })}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>
                      R$ {calculateTotal().toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleBuyNow}
                disabled={selectedLenses.length === 0}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedLenses.length === 0
                  ? "Selecione uma lente"
                  : `Comprar por R$ ${calculateTotal()
                      .toFixed(2)
                      .replace(".", ",")}`}
              </button>
              <p className="text-gray-600 mt-4">
                Total de tipos de lentes: {lensTypes.length}
              </p>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Compra */}
      <PurchaseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedLenses={getSelectedLensesData()}
        totalPrice={calculateTotal()}
        onSubmit={handlePurchaseSubmit}
      />
    </div>
  );
}
