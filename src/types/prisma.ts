import type {
  User,
  Customer,
  Admin,
  LensType,
  Order,
  OrderItem,
  Prescription,
  Tracking,
  UserRole,
  OrderStatus,
  TrackingStatus,
} from "@prisma/client";

// Tipos para inclusões comuns
export type UserWithCustomer = User & {
  customer: Customer | null;
};

export type UserWithAdmin = User & {
  admin: Admin | null;
};

export type OrderWithItems = Order & {
  orderItems: (OrderItem & {
    lensType: LensType;
  })[];
};

export type OrderWithTracking = Order & {
  tracking: Tracking[];
};

export type OrderWithCustomer = Order & {
  customer: Customer;
};

export type CustomerWithPrescriptions = Customer & {
  prescriptions: Prescription[];
};

export type CustomerWithOrders = Customer & {
  orders: Order[];
};

// Tipos para formulários
export type CreateUserData = {
  email: string;
  name: string;
  role?: UserRole;
};

export type CreateCustomerData = {
  userId: string;
  phone?: string;
  address?: string;
  birthDate?: Date;
};

export type CreateOrderData = {
  customerId: string;
  lensTypeIds: string[];
  notes?: string;
};

export type UpdateOrderStatusData = {
  orderId: string;
  status: OrderStatus;
  description?: string;
  location?: string;
};

export type CreatePrescriptionData = {
  customerId: string;
  rightEyeSphere?: number;
  leftEyeSphere?: number;
  rightEyeCylinder?: number;
  leftEyeCylinder?: number;
  rightEyeAxis?: number;
  leftEyeAxis?: number;
  rightEyeAdd?: number;
  leftEyeAdd?: number;
  pupillaryDistance?: number;
  notes?: string;
};

// Tipos para respostas de API
export type OrderResponse = OrderWithItems &
  OrderWithTracking &
  OrderWithCustomer;

export type CustomerResponse = CustomerWithPrescriptions &
  CustomerWithOrders & {
    user: User;
  };

// Re-export dos tipos básicos do Prisma
export type {
  User,
  Customer,
  Admin,
  LensType,
  Order,
  OrderItem,
  Prescription,
  Tracking,
  UserRole,
  OrderStatus,
  TrackingStatus,
};
