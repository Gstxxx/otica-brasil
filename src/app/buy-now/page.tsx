"use client";
import React, { useMemo, useState } from "react";
import PurchaseModal, { type PurchaseFormData, type PurchaseFiles } from "@/components/PurchaseModal";
import LensCard from "@/components/buy/LensCard";
import SelectedSummary from "@/components/buy/SelectedSummary";
import { useLensTypes } from "@/hooks/useLensTypes";
import { ShoppingCart, Eye, Star, Zap } from "lucide-react";

export default function BuyNowPage() {
  const { lensTypes, isLoading, error, refresh } = useLensTypes();
  const [selectedLenses, setSelectedLenses] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleLensToggle = (lensId: string) => {
    setSelectedLenses((prev) =>
      prev.includes(lensId)
        ? prev.filter((id) => id !== lensId)
        : [...prev, lensId]
    );
  };

  const totalPrice = useMemo(() => {
    return selectedLenses.reduce((total, lensId) => {
      const lens = lensTypes.find((l) => l.id === lensId);
      if (!lens) return total;
      const price = typeof lens.basePrice === "string" ? parseFloat(lens.basePrice) : lens.basePrice;
      return total + (Number.isFinite(price) ? price : 0);
    }, 0);
  }, [selectedLenses, lensTypes]);

  const getSelectedLensesData = () => {
    return selectedLenses.map((lensId) => {
      const lens = lensTypes.find((l) => l.id === lensId);
      const basePrice = lens ? (typeof lens.basePrice === "string" ? lens.basePrice : String(lens.basePrice)) : "0";
      return { id: lensId, name: lens?.name || "", basePrice };
    });
  };

  const handlePurchaseSubmit = async (
    data: PurchaseFormData & { files: PurchaseFiles }
  ) => {
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-200"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Carregando lentes...</h3>
          <p className="text-gray-600">Preparando a melhor seleção para você</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-red-600 text-2xl">⚠️</div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Ops! Algo deu errado</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={refresh}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-8">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Tecnologia Avançada</span>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Lentes
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Personalizadas
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Descubra a tecnologia mais avançada em lentes oftálmicas. 
              Visão perfeita, estilo único.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{lensTypes.length}+</div>
                <div className="text-blue-200">Tipos de Lentes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-blue-200">Personalizadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24h</div>
                <div className="text-blue-200">Suporte</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Selection Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Escolha suas Lentes</h2>
                    <p className="text-gray-600">Selecione uma ou mais opções</p>
                  </div>
                </div>
                
                {selectedLenses.length > 0 && (
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    {selectedLenses.length} selecionada(s)
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Lenses Grid */}
              <div className="grid gap-6 mb-8">
                {lensTypes.map((lens) => (
                  <LensCard
                    key={lens.id}
                    lens={lens}
                    isSelected={selectedLenses.includes(lens.id)}
                    onToggle={handleLensToggle}
                  />
                ))}
              </div>

              {/* Selection Summary */}
              {selectedLenses.length > 0 && (
                <div className="border-t pt-8">
                  <SelectedSummary 
                    selectedIds={selectedLenses} 
                    lenses={lensTypes} 
                    total={totalPrice} 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Floating Action Button */}
          {selectedLenses.length > 0 && (
            <div className="fixed bottom-8 right-8 z-20">
              <button
                onClick={handleBuyNow}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">Finalizar Compra</div>
                  <div className="text-sm opacity-90">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Empty State */}
          {selectedLenses.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Selecione suas lentes
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Escolha uma ou mais lentes acima para começar. 
                Nossa equipe criará a solução perfeita para você.
              </p>
            </div>
          )}

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 py-16">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualidade Premium</h3>
              <p className="text-gray-600">Materiais de alta qualidade e tecnologia de ponta</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalização Total</h3>
              <p className="text-gray-600">Cada lente é única e feita especialmente para você</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Processo otimizado para máxima agilidade</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Compra */}
      <PurchaseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedLenses={getSelectedLensesData()}
        totalPrice={totalPrice}
        onSubmit={handlePurchaseSubmit}
      />
    </div>
  );
}
