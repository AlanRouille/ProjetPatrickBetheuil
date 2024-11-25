/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `PaymentSession` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `PaymentSession` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PaymentSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "artworks" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "price" REAL NOT NULL
);
INSERT INTO "new_PaymentSession" ("artworks", "createdAt", "email", "id", "price", "status", "stripeSessionId", "updatedAt") SELECT "artworks", "createdAt", "email", "id", "price", "status", "stripeSessionId", "updatedAt" FROM "PaymentSession";
DROP TABLE "PaymentSession";
ALTER TABLE "new_PaymentSession" RENAME TO "PaymentSession";
CREATE UNIQUE INDEX "PaymentSession_stripeSessionId_key" ON "PaymentSession"("stripeSessionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
