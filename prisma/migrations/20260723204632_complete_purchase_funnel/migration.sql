-- AlterTable
ALTER TABLE "Artwork" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "adminEmailSentAt" TIMESTAMP(3),
ADD COLUMN     "buyerEmailSentAt" TIMESTAMP(3),
ADD COLUMN     "paidAt" TIMESTAMP(3);
