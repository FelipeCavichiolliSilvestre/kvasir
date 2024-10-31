-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "weightInKg" REAL NOT NULL,
    "heightInCm" INTEGER NOT NULL
);
