/*
  Warnings:

  - You are about to drop the column `discription` on the `Slider` table. All the data in the column will be lost.
  - Added the required column `description` to the `Slider` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Slider] DROP COLUMN [discription];
ALTER TABLE [dbo].[Slider] ADD [description] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
