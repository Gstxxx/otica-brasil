"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Camera, FileText, CreditCard } from "lucide-react";
import type { LensType } from "@prisma/client";
import {
  completeCustomerRegistrationSchema,
  type CompleteCustomerRegistrationInput,
} from "@/lib/validations";
import FileUpload from "./FileUpload";
import CepInput from "./CepInput";

interface UploadedFile {
  url: string;
  fileName: string;
  originalName: string;
  size: number;
  type: string;
}

interface CustomerOrderFormProps {
  lensTypes: (
    | LensType
    | {
        id: string;
        name: string;
        description: string | null;
        basePrice: string | { toString(): string };
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
      }
  )[];
  onSubmit: (data: {
    customer: CompleteCustomerRegistrationInput;
    selectedLenses: string[];
    files: {
      glassesPhoto: UploadedFile | null;
      prescriptionPhoto: UploadedFile | null;
      identityDocument: UploadedFile | null;
    };
  }) => Promise<void>;
}

export default function CustomerOrderForm({
  lensTypes,
  onSubmit,
}: CustomerOrderFormProps) {
  const [step, setStep] = useState(1);
  const [selectedLenses, setSelectedLenses] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [files, setFiles] = useState({
    glassesPhoto: null as File | null,
    prescriptionPhoto: null as File | null,
    identityDocument: null as File | null,
  });
  const [address, setAddress] = useState({
    cep: "",
    address: "",
    city: "",
    state: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CompleteCustomerRegistrationInput>({
    resolver: zodResolver(completeCustomerRegistrationSchema),
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

  const handleLensToggle = (lensId: string) => {
    setSelectedLenses((prev) =>
      prev.includes(lensId)
        ? prev.filter((id) => id !== lensId)
        : [...prev, lensId]
    );
  };

  const calculateTotal = () => {
    return selectedLenses.reduce((total, lensId) => {
      const lens = lensTypes.find((l) => l.id === lensId);
      return total + (lens ? parseFloat(lens.basePrice.toString()) : 0);
    }, 0);
  };

  const onFormSubmit = async (data: CompleteCustomerRegistrationInput) => {
    if (selectedLenses.length === 0) {
      alert("Selecione pelo menos um tipo de lente");
      return;
    }

    if (!files.glassesPhoto || !files.prescriptionPhoto) {
      alert("É necessário enviar a foto dos óculos e da prescrição");
      return;
    }

    try {
      // Upload dos arquivos
      const uploadedFiles: {
        glassesPhoto: UploadedFile | null;
        prescriptionPhoto: UploadedFile | null;
        identityDocument: UploadedFile | null;
      } = {
        glassesPhoto: null,
        prescriptionPhoto: null,
        identityDocument: null,
      };

      // Upload foto dos óculos
      if (files.glassesPhoto) {
        const formData = new FormData();
        formData.append("file", files.glassesPhoto);
        formData.append("type", "glasses");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Erro ao fazer upload da foto dos óculos");
        }

        const result = await response.json();
        uploadedFiles.glassesPhoto = result.data;
      }

      // Upload foto da prescrição
      if (files.prescriptionPhoto) {
        const formData = new FormData();
        formData.append("file", files.prescriptionPhoto);
        formData.append("type", "prescription");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Erro ao fazer upload da foto da prescrição");
        }

        const result = await response.json();
        uploadedFiles.prescriptionPhoto = result.data;
      }

      // Upload documento de identidade (opcional)
      if (files.identityDocument) {
        const formData = new FormData();
        formData.append("file", files.identityDocument);
        formData.append("type", "identity");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Erro ao fazer upload do documento de identidade");
        }

        const result = await response.json();
        uploadedFiles.identityDocument = result.data;
      }

      await onSubmit({
        customer: data,
        selectedLenses,
        files: uploadedFiles,
      });
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao fazer upload dos arquivos. Tente novamente.");
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
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
              className={`w-16 h-1 mx-2 ${
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
      <h3 className="text-lg font-semibold text-gray-900">Dados Pessoais</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 relative z-20 text-black"
            placeholder="Seu nome completo"
            style={{ pointerEvents: "auto" }}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 relative z-20 text-black"
            placeholder="seu@email.com"
            style={{ pointerEvents: "auto" }}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 relative z-20 text-black"
            placeholder="(11) 99999-9999"
            style={{ pointerEvents: "auto" }}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 relative z-20 text-black"
            style={{ pointerEvents: "auto" }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Endereço</h3>

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
        <div>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 relative z-20 text-black"
            placeholder="Rua, número, complemento"
            style={{ pointerEvents: "auto" }}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 relative z-20 text-black"
            placeholder="Sua cidade"
            style={{ pointerEvents: "auto" }}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 relative z-20 text-black"
            placeholder="Seu estado"
            style={{ pointerEvents: "auto" }}
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
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Seleção de Lentes</h3>

      <div className="grid gap-4">
        {lensTypes.map((lens) => (
          <div
            key={lens.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedLenses.includes(lens.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => handleLensToggle(lens.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedLenses.includes(lens.id)}
                  onChange={() => handleLensToggle(lens.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{lens.name}</h4>
                  <p className="text-sm text-gray-600">{lens.description}</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                R${" "}
                {parseFloat(lens.basePrice.toString())
                  .toFixed(2)
                  .replace(".", ",")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedLenses.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Resumo do Pedido</h4>
          <div className="space-y-2">
            {selectedLenses.map((lensId) => {
              const lens = lensTypes.find((l) => l.id === lensId);
              return (
                <div key={lensId} className="flex justify-between text-sm">
                  <span>{lens?.name}</span>
                  <span>
                    R${" "}
                    {lens
                      ? parseFloat(lens.basePrice.toString())
                          .toFixed(2)
                          .replace(".", ",")
                      : "0,00"}
                  </span>
                </div>
              );
            })}
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Total:</span>
              <span>R$ {calculateTotal().toFixed(2).replace(".", ",")}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={nextStep}
          disabled={selectedLenses.length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Documentos e Fotos
      </h3>

      <div className="space-y-6">
        <FileUpload
          label="Foto dos Óculos"
          accept="image/*"
          onFileSelect={handleFileSelect("glassesPhoto")}
          onFileRemove={handleFileRemove("glassesPhoto")}
          selectedFile={files.glassesPhoto}
          required
        />

        <FileUpload
          label="Foto da Prescrição Médica"
          accept="image/*,.pdf"
          onFileSelect={handleFileSelect("prescriptionPhoto")}
          onFileRemove={handleFileRemove("prescriptionPhoto")}
          selectedFile={files.prescriptionPhoto}
          required
        />

        <FileUpload
          label="Documento de Identidade (RG/CPF)"
          accept="image/*,.pdf"
          onFileSelect={handleFileSelect("identityDocument")}
          onFileRemove={handleFileRemove("identityDocument")}
          selectedFile={files.identityDocument}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          Informações Importantes
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Envie uma foto clara dos seus óculos atuais</li>
          <li>• A prescrição médica deve estar legível e atualizada</li>
          <li>
            • Após o pedido, você receberá instruções para envio dos óculos
          </li>
          <li>
            • O prazo de entrega é de 5-7 dias úteis após recebermos seus óculos
          </li>
        </ul>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Anterior
        </button>
        <button
          type="submit"
          disabled={
            isSubmitting || !files.glassesPhoto || !files.prescriptionPhoto
          }
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processando..." : "Finalizar Pedido"}
        </button>
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-8 relative z-10"
    >
      {renderStepIndicator()}

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </form>
  );
}
