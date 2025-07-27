"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LensType } from "@prisma/client";
import { createOrderSchema, type CreateOrderInput } from "@/lib/validations";

interface OrderFormProps {
  lensTypes: LensType[];
  customerId: string;
  onSubmit: (data: CreateOrderInput) => Promise<void>;
}

export default function OrderForm({
  lensTypes,
  customerId,
  onSubmit,
}: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customerId,
      lensTypeIds: [],
      notes: "",
    },
  });

  const selectedLensIds = watch("lensTypeIds");

  const handleLensToggle = (lensId: string) => {
    const currentSelection = selectedLensIds || [];
    const newSelection = currentSelection.includes(lensId)
      ? currentSelection.filter((id) => id !== lensId)
      : [...currentSelection, lensId];

    setValue("lensTypeIds", newSelection);
  };

  const calculateTotal = () => {
    if (!selectedLensIds) return 0;
    return selectedLensIds.reduce((total, lensId) => {
      const lens = lensTypes.find((l) => l.id === lensId);
      return total + (lens ? parseFloat(lens.basePrice.toString()) : 0);
    }, 0);
  };

  const onFormSubmit = async (data: CreateOrderInput) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Escolha suas Lentes
        </h3>

        {/* Seleção de Lentes */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lensTypes.map((lens) => (
            <div
              key={lens.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedLensIds?.includes(lens.id)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleLensToggle(lens.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900">{lens.name}</h4>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedLensIds?.includes(lens.id)
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedLensIds?.includes(lens.id) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">{lens.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  R${" "}
                  {parseFloat(lens.basePrice.toString())
                    .toFixed(2)
                    .replace(".", ",")}
                </span>

                {selectedLensIds?.includes(lens.id) && (
                  <span className="text-sm text-blue-600 font-medium">
                    Selecionado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {errors.lensTypeIds && (
          <p className="mt-2 text-sm text-red-600">
            {errors.lensTypeIds.message}
          </p>
        )}
      </div>

      {/* Campo de Observações */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Observações (opcional)
        </label>
        <textarea
          id="notes"
          {...register("notes")}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Informações adicionais sobre seu pedido..."
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
        )}
      </div>

      {/* Resumo do Pedido */}
      {selectedLensIds && selectedLensIds.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Resumo do Pedido</h4>
          <div className="space-y-2">
            {selectedLensIds.map((lensId) => {
              const lens = lensTypes.find((l) => l.id === lensId);
              return (
                <div key={lensId} className="flex justify-between text-sm">
                  <span>{lens?.name}</span>
                  <span className="font-medium">
                    R$ {lens?.basePrice.toNumber().toFixed(2).replace(".", ",")}
                  </span>
                </div>
              );
            })}
            <div className="border-t pt-2 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>R$ {calculateTotal().toFixed(2).replace(".", ",")}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botão de Envio */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={
            isSubmitting || !selectedLensIds || selectedLensIds.length === 0
          }
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Criando Pedido..." : "Criar Pedido"}
        </button>
      </div>
    </form>
  );
}
