"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  Users,
  Package,
  DollarSign,
  Eye,
  Search,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

interface Order {
  id: string;
  status: string;
  totalAmount: string;
  createdAt: string;
  customer: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    phone?: string;
    address?: string;
  };
  orderItems: Array<{
    id: string;
    lensType: {
      name: string;
      basePrice: string;
    };
    quantity: number;
    price: string;
  }>;
  tracking: Array<{
    id: string;
    status: string;
    description: string;
    createdAt: string;
  }>;
}

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  pendingOrders: number;
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
  });
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    if (user && user.role === "ADMIN") {
      fetchOrders();
      fetchStats();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data.data.orders || []);
      }
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Calcular estatísticas dos pedidos
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        const allOrders = data.data.orders || [];

        const totalOrders = allOrders.length;
        const totalRevenue = allOrders.reduce(
          (sum: number, order: Order) => sum + parseFloat(order.totalAmount),
          0
        );
        const pendingOrders = allOrders.filter(
          (order: Order) => order.status === "PENDING"
        ).length;

        // Contar clientes únicos
        const uniqueCustomers = new Set(
          allOrders.map((order: Order) => order.customer.id)
        ).size;

        setStats({
          totalOrders,
          totalRevenue,
          totalCustomers: uniqueCustomers,
          pendingOrders,
        });
      }
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Atualizar lista de pedidos
        fetchOrders();
        fetchStats();
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600 bg-yellow-100";
      case "CONFIRMED":
        return "text-blue-600 bg-blue-100";
      case "GLASSES_RECEIVED":
        return "text-purple-600 bg-purple-100";
      case "LENSES_IN_PRODUCTION":
        return "text-indigo-600 bg-indigo-100";
      case "READY_FOR_DELIVERY":
        return "text-orange-600 bg-orange-100";
      case "DELIVERED":
        return "text-green-600 bg-green-100";
      case "CANCELLED":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-4 h-4" />;
      case "CONFIRMED":
        return <CheckCircle className="w-4 h-4" />;
      case "GLASSES_RECEIVED":
        return <Package className="w-4 h-4" />;
      case "LENSES_IN_PRODUCTION":
        return <Package className="w-4 h-4" />;
      case "READY_FOR_DELIVERY":
        return <Package className="w-4 h-4" />;
      case "DELIVERED":
        return <CheckCircle className="w-4 h-4" />;
      case "CANCELLED":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.customer.user.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">
            Acesso negado. Apenas administradores podem acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Administrativo
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie pedidos, clientes e monitore o desempenho
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total de Pedidos
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Receita Total
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {stats.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Clientes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalCustomers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pedidos Pendentes
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingOrders}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
                Gerenciar Pedidos
              </h2>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar pedidos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos os status</option>
                  <option value="PENDING">Pendente</option>
                  <option value="CONFIRMED">Confirmado</option>
                  <option value="GLASSES_RECEIVED">Óculos Recebidos</option>
                  <option value="LENSES_IN_PRODUCTION">
                    Lentes em Produção
                  </option>
                  <option value="READY_FOR_DELIVERY">
                    Pronto para Entrega
                  </option>
                  <option value="DELIVERED">Entregue</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {ordersLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Carregando pedidos...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-8 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum pedido encontrado.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order.id.slice(-8)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.orderItems.length} item(s)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer.user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customer.user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="ml-1">
                            {order.status === "PENDING" && "Pendente"}
                            {order.status === "CONFIRMED" && "Confirmado"}
                            {order.status === "GLASSES_RECEIVED" &&
                              "Óculos Recebidos"}
                            {order.status === "LENSES_IN_PRODUCTION" &&
                              "Lentes em Produção"}
                            {order.status === "READY_FOR_DELIVERY" &&
                              "Pronto para Entrega"}
                            {order.status === "DELIVERED" && "Entregue"}
                            {order.status === "CANCELLED" && "Cancelado"}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        R$ {parseFloat(order.totalAmount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowOrderModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="PENDING">Pendente</option>
                            <option value="CONFIRMED">Confirmado</option>
                            <option value="GLASSES_RECEIVED">
                              Óculos Recebidos
                            </option>
                            <option value="LENSES_IN_PRODUCTION">
                              Lentes em Produção
                            </option>
                            <option value="READY_FOR_DELIVERY">
                              Pronto para Entrega
                            </option>
                            <option value="DELIVERED">Entregue</option>
                            <option value="CANCELLED">Cancelado</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Order Details Modal */}
        {showOrderModal && selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Detalhes do Pedido #{selectedOrder.id.slice(-8)}
                </h3>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">
                    Informações do Cliente
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Nome:</span>
                      <span className="text-sm font-medium">
                        {selectedOrder.customer.user.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium">
                        {selectedOrder.customer.user.email}
                      </span>
                    </div>
                    {selectedOrder.customer.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Telefone:</span>
                        <span className="text-sm font-medium">
                          {selectedOrder.customer.phone}
                        </span>
                      </div>
                    )}
                    {selectedOrder.customer.address && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Endereço:</span>
                        <span className="text-sm font-medium">
                          {selectedOrder.customer.address}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">
                    Itens do Pedido
                  </h4>
                  <div className="space-y-2">
                    {selectedOrder.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{item.lensType.name}</p>
                          <p className="text-sm text-gray-500">
                            Quantidade: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          R$ {parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">
                      Total:
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      R$ {parseFloat(selectedOrder.totalAmount).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Tracking */}
                {selectedOrder.tracking &&
                  selectedOrder.tracking.length > 0 && (
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">
                        Acompanhamento
                      </h4>
                      <div className="space-y-2">
                        {selectedOrder.tracking.map((track) => (
                          <div
                            key={track.id}
                            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">
                                {track.description}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(track.createdAt).toLocaleDateString(
                                  "pt-BR"
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
