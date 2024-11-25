-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artwork" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Artwork" ("description", "id", "imageUrl", "price", "title") SELECT "description", "id", "imageUrl", "price", "title" FROM "Artwork";
DROP TABLE "Artwork";
ALTER TABLE "new_Artwork" RENAME TO "Artwork";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
