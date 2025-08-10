"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  X,
  Camera,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Eye,
  Plus,
  Minus,
} from "lucide-react";
import FileUpload from "./FileUpload";
import CepInput from "./CepInput";

// Schema de validação para o formulário de compra
const purchaseSchema = z.object({
  // Dados pessoais
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  birthDate: z.string().optional(),

  // Endereço
  cep: z.string().min(8, "CEP é obrigatório"),
  address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  complement: z.string().optional(),

  // Graus - Olho Direito
  rightEyeSphere: z.number().min(-20).max(20).optional(),
  rightEyeCylinder: z.number().min(-6).max(6).optional(),
  rightEyeAxis: z.number().min(0).max(180).optional(),
  rightEyeAdd: z.number().min(0).max(3.5).optional(),

  // Graus - Olho Esquerdo
  leftEyeSphere: z.number().min(-20).max(20).optional(),
  leftEyeCylinder: z.number().min(-6).max(6).optional(),
  leftEyeAxis: z.number().min(0).max(180).optional(),
  leftEyeAdd: z.number().min(0).max(3.5).optional(),

  // Distância pupilar
  pupillaryDistance: z.number().min(50).max(80).optional(),

  // Observações
  notes: z.string().optional(),
});

type PurchaseFormData = z.infer<typeof purchaseSchema>;

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLenses: Array<{
    id: string;
    name: string;
    basePrice: string;
  }>;
  totalPrice: number;
  onSubmit: (data: PurchaseFormData & { files: any }) => Promise<void>;
}

export default function PurchaseModal({
  isOpen,
  onClose,
  selectedLenses,
  totalPrice,
  onSubmit,
}: PurchaseModalProps) {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState({
    profilePhoto: null as File | null,
    prescriptionPhoto: null as File | null,
    glassesPhoto: null as File | null,
  });
  const [address, setAddress] = useState({
    cep: "",
    address: "",
    city: "",
    state: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
  });

  const handleCepFound = (addressData: {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
  }) => {
    setAddress({
      cep: addressData.cep,
      address: `${addressData.logradouro}, ${addressData.bairro}`,
      city: addressData.localidade,
      state: addressData.uf,
    });

    setValue("cep", addressData.cep);
    setValue("address", `${addressData.logradouro}, ${addressData.bairro}`);
    setValue("city", addressData.localidade);
    setValue("state", addressData.uf);
  };

  const handleFileSelect = (type: keyof typeof files) => (file: File) => {
    setFiles((prev) => ({ ...prev, [type]: file }));
  };

  const handleFileRemove = (type: keyof typeof files) => () => {
    setFiles((prev) => ({ ...prev, [type]: null }));
  };

  const onFormSubmit = async (data: PurchaseFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit({ ...data, files });
      handleClose();
    } catch (error) {
      console.error("Erro ao processar pedido:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFiles({
      profilePhoto: null,
      prescriptionPhoto: null,
      glassesPhoto: null,
    });
    setAddress({ cep: "", address: "", city: "", state: "" });
    reset();
    onClose();
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3, 4].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNumber
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {stepNumber}
          </div>
          {stepNumber < 4 && (
            <div
              className={`w-12 h-1 mx-2 ${
                step > stepNumber ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <User className="w-12 h-12 text-blue-600 mx-auto mb-2" />
        <h3 className="text-xl font-semibold text-gray-900">Dados Pessoais</h3>
        <p className="text-gray-600">Informe seus dados para o pedido</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Seu nome completo"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="seu@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone *
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="(11) 99999-9999"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data de Nascimento
          </label>
          <input
            type="date"
            {...register("birthDate")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
        <h3 className="text-xl font-semibold text-gray-900">Endereço</h3>
        <p className="text-gray-600">Onde devemos entregar suas lentes</p>
      </div>

      <CepInput
        value={address.cep}
        onChange={(cep) => {
          setAddress((prev) => ({ ...prev, cep }));
          setValue("cep", cep);
        }}
        onAddressFound={handleCepFound}
        error={errors.cep?.message}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Endereço *
          </label>
          <input
            type="text"
            {...register("address")}
            value={address.address}
            onChange={(e) => {
              setAddress((prev) => ({ ...prev, address: e.target.value }));
              setValue("address", e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Rua, número"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Complemento
          </label>
          <input
            type="text"
            {...register("complement")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Apto, bloco, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cidade *
          </label>
          <input
            type="text"
            {...register("city")}
            value={address.city}
            onChange={(e) => {
              setAddress((prev) => ({ ...prev, city: e.target.value }));
              setValue("city", e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Sua cidade"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado *
          </label>
          <input
            type="text"
            {...register("state")}
            value={address.state}
            onChange={(e) => {
              setAddress((prev) => ({ ...prev, state: e.target.value }));
              setValue("state", e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="SP"
            maxLength={2}
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Eye className="w-12 h-12 text-blue-600 mx-auto mb-2" />
        <h3 className="text-xl font-semibold text-gray-900">Graus das Lentes</h3>
        <p className="text-gray-600">
          Informe os graus conforme sua receita médica
        </p>
      </div>

      {/* Olho Direito */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Olho Direito (OD)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Esférico
            </label>
            <input
              type="number"
              step="0.25"
              {...register("rightEyeSphere", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cilíndrico
            </label>
            <input
              type="number"
              step="0.25"
              {...register("rightEyeCylinder", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Eixo
            </label>
            <input
              type="number"
              {...register("rightEyeAxis", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="0"
              min="0"
              max="180"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adição
            </label>
            <input
              type="number"
              step="0.25"
              {...register("rightEyeAdd", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* Olho Esquerdo */}
      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Olho Esquerdo (OE)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Esférico
            </label>
            <input
              type="number"
              step="0.25"
              {...register("leftEyeSphere", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cilíndrico
            </label>
            <input
              type="number"
              step="0.25"
              {...register("leftEyeCylinder", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Eixo
            </label>
            <input
              type="number"
              {...register("leftEyeAxis", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="0"
              min="0"
              max="180"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adição
            </label>
            <input
              type="number"
              step="0.25"
              {...register("leftEyeAdd", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* Distância Pupilar */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-4">
          Distância Pupilar (DP)
        </h4>
        <div className="w-32">
          <input
            type="number"
            step="0.5"
            {...register("pupillaryDistance", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="62.0"
            min="50"
            max="80"
          />
          <p className="text-xs text-gray-500 mt-1">Em milímetros</p>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Camera className="w-12 h-12 text-blue-600 mx-auto mb-2" />
        <h3 className="text-xl font-semibold text-gray-900">
          Fotos e Documentos
        </h3>
        <p className="text-gray-600">
          Envie as fotos necessárias para processar seu pedido
        </p>
      </div>

      <div className="space-y-6">
        <FileUpload
          label="Sua Foto (para medidas faciais)"
          accept="image/*"
          onFileSelect={handleFileSelect("profilePhoto")}
          onFileRemove={handleFileRemove("profilePhoto")}
          selectedFile={files.profilePhoto}
          required
        />

        <FileUpload
          label="Foto da Receita Médica"
          accept="image/*,.pdf"
          onFileSelect={handleFileSelect("prescriptionPhoto")}
          onFileRemove={handleFileRemove("prescriptionPhoto")}
          selectedFile={files.prescriptionPhoto}
          required
        />

        <FileUpload
          label="Foto dos Óculos Atuais (se houver)"
          accept="image/*"
          onFileSelect={handleFileSelect("glassesPhoto")}
          onFileRemove={handleFileRemove("glassesPhoto")}
          selectedFile={files.glassesPhoto}
        />
      </div>

      {/* Observações */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Observações Adicionais
        </label>
        <textarea
          {...register("notes")}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Alguma informação adicional sobre suas necessidades visuais..."
        />
      </div>

      {/* Resumo do Pedido */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Resumo do Pedido</h4>
        <div className="space-y-2">
          {selectedLenses.map((lens) => (
            <div key={lens.id} className="flex justify-between text-sm">
              <span>{lens.name}</span>
              <span>R$ {parseFloat(lens.basePrice).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total:</span>
            <span>R$ {totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Anterior
        </button>
        <button
          type="submit"
          disabled={
            isSubmitting || !files.profilePhoto || !files.prescriptionPhoto
          }
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processando..." : "Finalizar Pedido"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Finalizar Compra
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6">
          {renderStepIndicator()}

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </form>
      </div>
    </div>
  );
}