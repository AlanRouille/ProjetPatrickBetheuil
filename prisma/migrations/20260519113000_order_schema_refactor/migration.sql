-- CreateEnum
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "ArtworkStatus" AS ENUM ('AVAILABLE', 'SOLD', 'RESERVED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELED');

-- Alter Artwork with backward-compatible defaults for existing rows
ALTER TABLE "Artwork" ADD COLUMN "slug" TEXT;
ALTER TABLE "Artwork" ADD COLUMN "technique" TEXT;
ALTER TABLE "Artwork" ADD COLUMN "dimensions" TEXT;
ALTER TABLE "Artwork" ADD COLUMN "year" INTEGER;
ALTER TABLE "Artwork" ADD COLUMN "metaTitle" TEXT;
ALTER TABLE "Artwork" ADD COLUMN "metaDescription" TEXT;
ALTER TABLE "Artwork" ADD COLUMN "status" "ArtworkStatus" NOT NULL DEFAULT 'AVAILABLE';
ALTER TABLE "Artwork" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Artwork" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

UPDATE "Artwork"
SET
  "slug" = lower(regexp_replace(concat("id"::text, '-', "title"), '[^a-zA-Z0-9]+', '-', 'g')),
  "status" = CASE WHEN "isSoldOut" THEN 'SOLD'::"ArtworkStatus" ELSE 'AVAILABLE'::"ArtworkStatus" END;

ALTER TABLE "Artwork" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "Artwork" DROP COLUMN "isSoldOut";

-- CreateTable
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "firstName" TEXT,
  "lastName" TEXT,
  "phone" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtworkImage" (
  "id" TEXT NOT NULL,
  "artworkId" INTEGER NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "alt" TEXT,
  "position" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ArtworkImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
  "stripeSessionId" TEXT,
  "stripePaymentId" TEXT,
  "totalPrice" DOUBLE PRECISION NOT NULL,
  "shippingName" TEXT,
  "shippingAddress1" TEXT,
  "shippingAddress2" TEXT,
  "shippingCity" TEXT,
  "shippingPostal" TEXT,
  "shippingCountry" TEXT,
  "trackingNumber" TEXT,
  "shippedAt" TIMESTAMP(3),
  "deliveredAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
  "id" TEXT NOT NULL,
  "orderId" TEXT NOT NULL,
  "artworkId" INTEGER NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- Seed primary artwork images from the legacy imageUrl column
INSERT INTO "ArtworkImage" ("id", "artworkId", "imageUrl", "alt", "position")
SELECT gen_random_uuid()::text, "id", "imageUrl", "title", 0
FROM "Artwork";

-- Drop legacy checkout sessions after confirming the table is empty in Neon
DROP TABLE "PaymentSession";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Artwork_slug_key" ON "Artwork"("slug");
CREATE UNIQUE INDEX "Artwork_imageUrl_key" ON "Artwork"("imageUrl");
CREATE UNIQUE INDEX "ArtworkImage_artworkId_position_key" ON "ArtworkImage"("artworkId", "position");
CREATE UNIQUE INDEX "Order_stripeSessionId_key" ON "Order"("stripeSessionId");

-- AddForeignKey
ALTER TABLE "ArtworkImage" ADD CONSTRAINT "ArtworkImage_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
