-- CreateTable
CREATE TABLE "Diagnostic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,
    CONSTRAINT "Diagnostic_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
