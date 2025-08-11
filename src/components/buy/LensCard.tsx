"use client";

import React from "react";
import type { LensInfo } from "@/hooks/useLensTypes";
import { toBRL } from "@/lib/currency";
import { Check, Eye, Sparkles } from "lucide-react";

interface LensCardProps {
  lens: LensInfo;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export default function LensCard({ lens, isSelected, onToggle }: LensCardProps) {
  const priceNumber =
    typeof lens.basePrice === "string"
      ? parseFloat(lens.basePrice)
      : lens.basePrice;

  return (
    <div 
      className={`
        relative group cursor-pointer overflow-hidden
        ${isSelected 
          ? "bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50 border-2 border-blue-500 shadow-lg shadow-blue-500/10" 
          : "bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md"
        }
        rounded-2xl transition-all duration-300 hover:scale-[1.02]
      `}
      onClick={() => onToggle(lens.id)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 text-6xl text-blue-500">
          <Eye />
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-10">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 mt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(lens.id)}
              className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-md focus:ring-blue-500 focus:ring-2"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {lens.name}
              </h3>
            </div>
            
            {lens.description && (
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {lens.description}
              </p>
            )}
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Preço base
          </div>
          <div className={`
            px-4 py-2 rounded-full font-bold text-lg
            ${isSelected 
              ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg" 
              : "bg-gray-100 text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 group-hover:text-white"
            }
            transition-all duration-300
          `}>
            R$ {toBRL(priceNumber)}
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-gradient-to-br from-blue-500/5 via-violet-500/5 to-pink-500/5
        ${isSelected ? "opacity-100" : ""}
      `} />
    </div>
  );
}
