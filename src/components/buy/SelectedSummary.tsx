"use client";

import React from "react";
import type { LensInfo } from "@/hooks/useLensTypes";
import { toBRL } from "@/lib/currency";

interface SelectedSummaryProps {
  selectedIds: string[];
  lenses: LensInfo[];
  total: number;
}

export default function SelectedSummary({ selectedIds, lenses, total }: SelectedSummaryProps) {
  if (selectedIds.length === 0) return null;

  return (
    <div className="relative rounded-xl p-[2px] mb-6 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500">
      <div className="bg-white rounded-[inherit] p-4 sm:p-5">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-600 animate-pulse"></span>
        Lentes Selecionadas
      </h3>
      <div className="space-y-2">
        {selectedIds.map((lensId) => {
          const lens = lenses.find((l) => l.id === lensId);
          const priceNumber = lens ? (typeof lens.basePrice === "string" ? parseFloat(lens.basePrice) : lens.basePrice) : 0;
          return (
            <div key={lensId} className="flex justify-between text-sm">
              <span className="text-gray-700">{lens?.name}</span>
              <span className="font-medium text-gray-900">R$ {toBRL(priceNumber)}</span>
            </div>
          );
        })}
        <div className="border-t pt-3 flex justify-between items-center">
          <span className="font-medium text-gray-800">Total:</span>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-fuchsia-600">R$ {toBRL(total)}</span>
        </div>
      </div>
      </div>
    </div>
  );
}


