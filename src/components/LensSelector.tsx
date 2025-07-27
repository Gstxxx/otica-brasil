"use client";
import React, { useState } from "react";
import type { LensType } from "@prisma/client";

interface LensSelectorProps {
  lensTypes: LensType[];
  onSelectionChange: (selectedLenses: string[], totalPrice: number) => void;
}

export default function LensSelector({
  lensTypes,
  onSelectionChange,
}: LensSelectorProps) {
  const [selectedLenses, setSelectedLenses] = useState<string[]>([]);

  const handleLensToggle = (lensId: string) => {
    const newSelection = selectedLenses.includes(lensId)
      ? selectedLenses.filter((id) => id !== lensId)
      : [...selectedLenses, lensId];

    setSelectedLenses(newSelection);

    const totalPrice = newSelection.reduce((total, id) => {
      const lens = lensTypes.find((l) => l.id === id);
      return total + (lens?.basePrice.toNumber() || 0);
    }, 0);

    onSelectionChange(newSelection, totalPrice);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">
        Escolha suas Lentes
      </h3>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lensTypes.map((lens) => (
          <div
            key={lens.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedLenses.includes(lens.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleLensToggle(lens.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-medium text-gray-900">{lens.name}</h4>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedLenses.includes(lens.id)
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedLenses.includes(lens.id) && (
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
                R$ {lens.basePrice.toNumber().toFixed(2).replace(".", ",")}
              </span>

              {selectedLenses.includes(lens.id) && (
                <span className="text-sm text-blue-600 font-medium">
                  Selecionado
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedLenses.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">
            Lentes Selecionadas:
          </h4>
          <ul className="space-y-1">
            {selectedLenses.map((lensId) => {
              const lens = lensTypes.find((l) => l.id === lensId);
              return (
                <li
                  key={lensId}
                  className="text-sm text-gray-600 flex justify-between"
                >
                  <span>{lens?.name}</span>
                  <span className="font-medium">
                    R$ {lens?.basePrice.toNumber().toFixed(2).replace(".", ",")}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
