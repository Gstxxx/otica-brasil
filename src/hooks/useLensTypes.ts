"use client";

import { useEffect, useState } from "react";

export interface LensInfo {
  id: string;
  name: string;
  description: string | null;
  basePrice: number | string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type UseLensTypesResult = {
  lensTypes: LensInfo[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const staticLensTypes: LensInfo[] = [
  {
    id: "1",
    name: "Lente Monofocal",
    description: "Lente para correção de miopia, hipermetropia ou astigmatismo",
    basePrice: 150,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Lente Bifocal",
    description: "Lente com duas distâncias focais - longe e perto",
    basePrice: 250,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Lente Multifocal/Progressiva",
    description: "Lente progressiva para todas as distâncias",
    basePrice: 350,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Lente Transitions",
    description: "Lente fotocromática que escurece na luz solar",
    basePrice: 200,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Lente Antirreflexo",
    description: "Lente com tratamento antirreflexo para melhor visão",
    basePrice: 100,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Lente Blue Light",
    description: "Lente com filtro para luz azul de dispositivos eletrônicos",
    basePrice: 120,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useLensTypes(): UseLensTypesResult {
  const [lensTypes, setLensTypes] = useState<LensInfo[]>(staticLensTypes);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLensTypes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/lens-types");
      const data = await response.json();

      if (data?.success && data?.data?.lensTypes) {
        setLensTypes(data.data.lensTypes as LensInfo[]);
      }
    } catch (err) {
      console.warn("Erro ao carregar dados dinâmicos, usando dados estáticos", err);
      setError(null); // ficamos silenciosos e usamos fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLensTypes();
  }, []);

  return {
    lensTypes,
    isLoading,
    error,
    refresh: fetchLensTypes,
  };
}


