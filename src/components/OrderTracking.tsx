"use client";
import React from "react";
import type { Order, Tracking } from "@prisma/client";

interface TrackingStep {
  status: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface OrderTrackingProps {
  order: Order;
  trackingHistory?: Tracking[];
}

const trackingSteps: Record<string, TrackingStep[]> = {
  PENDING: [
    {
      status: "PENDING",
      title: "Pedido Realizado",
      description: "Seu pedido foi recebido",
      completed: true,
      current: true,
    },
    {
      status: "CONFIRMED",
      title: "Pedido Confirmado",
      description: "Aguardando envio dos óculos",
      completed: false,
      current: false,
    },
    {
      status: "GLASSES_RECEIVED",
      title: "Óculos Recebidos",
      description: "Óculos recebidos em nossa oficina",
      completed: false,
      current: false,
    },
    {
      status: "LENSES_IN_PRODUCTION",
      title: "Lentes em Produção",
      description: "Lentes sendo fabricadas",
      completed: false,
      current: false,
    },
    {
      status: "READY_FOR_DELIVERY",
      title: "Pronto para Entrega",
      description: "Óculos prontos para envio",
      completed: false,
      current: false,
    },
    {
      status: "DELIVERED",
      title: "Entregue",
      description: "Óculos entregues",
      completed: false,
      current: false,
    },
  ],
  CONFIRMED: [
    {
      status: "PENDING",
      title: "Pedido Realizado",
      description: "Seu pedido foi recebido",
      completed: true,
      current: false,
    },
    {
      status: "CONFIRMED",
      title: "Pedido Confirmado",
      description: "Aguardando envio dos óculos",
      completed: true,
      current: true,
    },
    {
      status: "GLASSES_RECEIVED",
      title: "Óculos Recebidos",
      description: "Óculos recebidos em nossa oficina",
      completed: false,
      current: false,
    },
    {
      status: "LENSES_IN_PRODUCTION",
      title: "Lentes em Produção",
      description: "Lentes sendo fabricadas",
      completed: false,
      current: false,
    },
    {
      status: "READY_FOR_DELIVERY",
      title: "Pronto para Entrega",
      description: "Óculos prontos para envio",
      completed: false,
      current: false,
    },
    {
      status: "DELIVERED",
      title: "Entregue",
      description: "Óculos entregues",
      completed: false,
      current: false,
    },
  ],
  GLASSES_RECEIVED: [
    {
      status: "PENDING",
      title: "Pedido Realizado",
      description: "Seu pedido foi recebido",
      completed: true,
      current: false,
    },
    {
      status: "CONFIRMED",
      title: "Pedido Confirmado",
      description: "Aguardando envio dos óculos",
      completed: true,
      current: false,
    },
    {
      status: "GLASSES_RECEIVED",
      title: "Óculos Recebidos",
      description: "Óculos recebidos em nossa oficina",
      completed: true,
      current: true,
    },
    {
      status: "LENSES_IN_PRODUCTION",
      title: "Lentes em Produção",
      description: "Lentes sendo fabricadas",
      completed: false,
      current: false,
    },
    {
      status: "READY_FOR_DELIVERY",
      title: "Pronto para Entrega",
      description: "Óculos prontos para envio",
      completed: false,
      current: false,
    },
    {
      status: "DELIVERED",
      title: "Entregue",
      description: "Óculos entregues",
      completed: false,
      current: false,
    },
  ],
  LENSES_IN_PRODUCTION: [
    {
      status: "PENDING",
      title: "Pedido Realizado",
      description: "Seu pedido foi recebido",
      completed: true,
      current: false,
    },
    {
      status: "CONFIRMED",
      title: "Pedido Confirmado",
      description: "Aguardando envio dos óculos",
      completed: true,
      current: false,
    },
    {
      status: "GLASSES_RECEIVED",
      title: "Óculos Recebidos",
      description: "Óculos recebidos em nossa oficina",
      completed: true,
      current: false,
    },
    {
      status: "LENSES_IN_PRODUCTION",
      title: "Lentes em Produção",
      description: "Lentes sendo fabricadas",
      completed: true,
      current: true,
    },
    {
      status: "READY_FOR_DELIVERY",
      title: "Pronto para Entrega",
      description: "Óculos prontos para envio",
      completed: false,
      current: false,
    },
    {
      status: "DELIVERED",
      title: "Entregue",
      description: "Óculos entregues",
      completed: false,
      current: false,
    },
  ],
  READY_FOR_DELIVERY: [
    {
      status: "PENDING",
      title: "Pedido Realizado",
      description: "Seu pedido foi recebido",
      completed: true,
      current: false,
    },
    {
      status: "CONFIRMED",
      title: "Pedido Confirmado",
      description: "Aguardando envio dos óculos",
      completed: true,
      current: false,
    },
    {
      status: "GLASSES_RECEIVED",
      title: "Óculos Recebidos",
      description: "Óculos recebidos em nossa oficina",
      completed: true,
      current: false,
    },
    {
      status: "LENSES_IN_PRODUCTION",
      title: "Lentes em Produção",
      description: "Lentes sendo fabricadas",
      completed: true,
      current: false,
    },
    {
      status: "READY_FOR_DELIVERY",
      title: "Pronto para Entrega",
      description: "Óculos prontos para envio",
      completed: true,
      current: true,
    },
    {
      status: "DELIVERED",
      title: "Entregue",
      description: "Óculos entregues",
      completed: false,
      current: false,
    },
  ],
  DELIVERED: [
    {
      status: "PENDING",
      title: "Pedido Realizado",
      description: "Seu pedido foi recebido",
      completed: true,
      current: false,
    },
    {
      status: "CONFIRMED",
      title: "Pedido Confirmado",
      description: "Aguardando envio dos óculos",
      completed: true,
      current: false,
    },
    {
      status: "GLASSES_RECEIVED",
      title: "Óculos Recebidos",
      description: "Óculos recebidos em nossa oficina",
      completed: true,
      current: false,
    },
    {
      status: "LENSES_IN_PRODUCTION",
      title: "Lentes em Produção",
      description: "Lentes sendo fabricadas",
      completed: true,
      current: false,
    },
    {
      status: "READY_FOR_DELIVERY",
      title: "Pronto para Entrega",
      description: "Óculos prontos para envio",
      completed: true,
      current: false,
    },
    {
      status: "DELIVERED",
      title: "Entregue",
      description: "Óculos entregues",
      completed: true,
      current: false,
    },
  ],
};

export default function OrderTracking({
  order,
  trackingHistory,
}: OrderTrackingProps) {
  const steps = trackingSteps[order.status] || trackingSteps.PENDING;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Acompanhe seu Pedido
        </h2>
        <p className="text-gray-600 mt-2">
          Pedido #{order.id.slice(-8).toUpperCase()}
        </p>
        <p className="text-gray-600">
          Total: R$ {order.totalAmount.toNumber().toFixed(2).replace(".", ",")}
        </p>
      </div>

      {/* Timeline de Status */}
      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.status} className="flex items-start mb-8">
            {/* Ícone de Status */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                step.completed
                  ? "bg-green-500 text-white"
                  : step.current
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step.completed ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>

            {/* Linha conectora */}
            {index < steps.length - 1 && (
              <div
                className={`absolute left-5 w-0.5 h-8 ${
                  step.completed ? "bg-green-500" : "bg-gray-300"
                }`}
                style={{ top: "40px" }}
              />
            )}

            {/* Conteúdo */}
            <div className="ml-4 flex-1">
              <h3
                className={`text-lg font-semibold ${
                  step.current
                    ? "text-blue-600"
                    : step.completed
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </h3>
              <p className="text-gray-600 mt-1">{step.description}</p>

              {/* Status atual destacado */}
              {step.current && (
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Status Atual
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Histórico de Tracking */}
      {trackingHistory && trackingHistory.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Histórico de Atualizações
          </h3>
          <div className="space-y-4">
            {trackingHistory.map((tracking) => (
              <div key={tracking.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {tracking.status}
                    </p>
                    {tracking.description && (
                      <p className="text-gray-600 mt-1">
                        {tracking.description}
                      </p>
                    )}
                    {tracking.location && (
                      <p className="text-sm text-gray-500 mt-1">
                        📍 {tracking.location}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(tracking.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
