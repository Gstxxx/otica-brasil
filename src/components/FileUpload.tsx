"use client";
import React, { useState, useRef } from "react";
import { Upload, X, File, Image } from "lucide-react";

interface FileUploadProps {
  label: string;
  accept?: string;
  maxSize?: number; // em MB
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile?: File | null;
  error?: string;
  required?: boolean;
}

export default function FileUpload({
  label,
  accept = "image/*,.pdf",
  maxSize = 5,
  onFileSelect,
  onFileRemove,
  selectedFile,
  error,
  required = false,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Arquivo muito grande. Tamanho máximo: ${maxSize}MB`);
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const getFileIcon = () => {
    if (!selectedFile) return <Upload className="w-8 h-8 text-gray-400" />;

    if (selectedFile.type.startsWith("image/")) {
      return <Image className="w-8 h-8 text-blue-500" />;
    }

    return <File className="w-8 h-8 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : error
            ? "border-red-300 bg-red-50"
            : selectedFile
            ? "border-green-300 bg-green-50"
            : "border-gray-300 bg-gray-50 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {selectedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getFileIcon()}
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onFileRemove}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {getFileIcon()}
            <div>
              <p className="text-sm text-gray-600">
                Arraste e solte um arquivo aqui, ou{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  clique para selecionar
                </button>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Tamanho máximo: {maxSize}MB
              </p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
