-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'GLASSES_RECEIVED', 'LENSES_IN_PRODUCTION', 'READY_FOR_DELIVERY', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."TrackingStatus" AS ENUM ('ORDER_PLACED', 'GLASSES_SENT', 'GLASSES_RECEIVED', 'LENSES_IN_PRODUCTION', 'LENSES_READY', 'GLASSES_SHIPPED', 'GLASSES_DELIVERED');

-- CreateEnum
CREATE TYPE "public"."AttachmentType" AS ENUM ('GLASSES_PHOTO', 'PRESCRIPTION_PHOTO', 'IDENTITY_DOCUMENT', 'OTHER');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "cep" TEXT,
    "city" TEXT,
    "state" TEXT,
    "birthDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lens_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "basePrice" DECIMAL(10,2) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lens_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."orders" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "lensTypeId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."prescriptions" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "rightEyeSphere" DECIMAL(4,2),
    "leftEyeSphere" DECIMAL(4,2),
    "rightEyeCylinder" DECIMAL(4,2),
    "leftEyeCylinder" DECIMAL(4,2),
    "rightEyeAxis" INTEGER,
    "leftEyeAxis" INTEGER,
    "rightEyeAdd" DECIMAL(4,2),
    "leftEyeAdd" DECIMAL(4,2),
    "pupillaryDistance" DECIMAL(4,1),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tracking" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "public"."TrackingStatus" NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_attachments" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "type" "public"."AttachmentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_userId_key" ON "public"."customers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_userId_key" ON "public"."admins"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "lens_types_name_key" ON "public"."lens_types"("name");

-- AddForeignKey
ALTER TABLE "public"."customers" ADD CONSTRAINT "customers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_lensTypeId_fkey" FOREIGN KEY ("lensTypeId") REFERENCES "public"."lens_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."prescriptions" ADD CONSTRAINT "prescriptions_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tracking" ADD CONSTRAINT "tracking_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_attachments" ADD CONSTRAINT "order_attachments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
