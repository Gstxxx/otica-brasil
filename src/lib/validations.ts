import { z } from "zod";
import { UserRole, OrderStatus, TrackingStatus } from "@prisma/client";

// Schema para criação de usuário
export const createUserSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  role: z.nativeEnum(UserRole).optional().default("CUSTOMER"),
});

// Schema para criação de cliente
export const createCustomerSchema = z.object({
  userId: z.string().cuid("ID de usuário inválido"),
  phone: z.string().optional(),
  address: z.string().optional(),
  cep: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  birthDate: z.date().optional(),
});

// Schema para criação de pedido
export const createOrderSchema = z.object({
  customerId: z.string().cuid("ID de cliente inválido"),
  lensTypeIds: z
    .array(z.string().cuid())
    .min(1, "Selecione pelo menos um tipo de lente"),
  notes: z.string().optional(),
});

// Schema para atualização de status do pedido
export const updateOrderStatusSchema = z.object({
  orderId: z.string().cuid("ID de pedido inválido"),
  status: z.nativeEnum(OrderStatus),
  description: z.string().optional(),
  location: z.string().optional(),
});

// Schema para criação de tracking
export const createTrackingSchema = z.object({
  orderId: z.string().cuid("ID de pedido inválido"),
  status: z.nativeEnum(TrackingStatus),
  description: z.string().optional(),
  location: z.string().optional(),
});

// Schema para receita oftalmológica
export const createPrescriptionSchema = z.object({
  customerId: z.string().cuid("ID de cliente inválido"),
  rightEyeSphere: z.number().min(-20).max(20).optional(),
  leftEyeSphere: z.number().min(-20).max(20).optional(),
  rightEyeCylinder: z.number().min(-6).max(6).optional(),
  leftEyeCylinder: z.number().min(-6).max(6).optional(),
  rightEyeAxis: z.number().min(0).max(180).optional(),
  leftEyeAxis: z.number().min(0).max(180).optional(),
  rightEyeAdd: z.number().min(0).max(3.5).optional(),
  leftEyeAdd: z.number().min(0).max(3.5).optional(),
  pupillaryDistance: z.number().min(50).max(80).optional(),
  notes: z.string().optional(),
});

// Schema para login
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

// Schema para registro
export const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

// Schema para alteração de senha
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Senha atual é obrigatória"),
    newPassword: z
      .string()
      .min(6, "Nova senha deve ter pelo menos 6 caracteres"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Senhas não coincidem",
    path: ["confirmNewPassword"],
  });

// Schema para atualização de perfil
export const updateProfileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string().optional(),
  address: z.string().optional(),
  cep: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  birthDate: z.string().optional(),
});

// Schema para cadastro completo do cliente
export const completeCustomerRegistrationSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  cep: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, "CEP deve estar no formato 00000-000 ou 00000000"),
  address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  state: z.string().min(2, "Estado deve ter pelo menos 2 caracteres"),
  birthDate: z.string().optional(),
});

// Schema para upload de arquivo
export const uploadFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Arquivo deve ter no máximo 5MB"
    ),
  type: z.enum([
    "GLASSES_PHOTO",
    "PRESCRIPTION_PHOTO",
    "IDENTITY_DOCUMENT",
    "OTHER",
  ]),
});

// Schema para busca de pedidos
export const searchOrdersSchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  customerId: z.string().cuid().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Tipos inferidos dos schemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type CreateTrackingInput = z.infer<typeof createTrackingSchema>;
export type CreatePrescriptionInput = z.infer<typeof createPrescriptionSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CompleteCustomerRegistrationInput = z.infer<
  typeof completeCustomerRegistrationSchema
>;
export type UploadFileInput = z.infer<typeof uploadFileSchema>;
export type SearchOrdersInput = z.infer<typeof searchOrdersSchema>;
