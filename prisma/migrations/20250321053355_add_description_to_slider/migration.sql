/*
  Warnings:

  - You are about to drop the column `content` on the `Slider` table. All the data in the column will be lost.
  - Added the required column `discription` to the `Slider` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Slider] DROP COLUMN [content];
ALTER TABLE [dbo].[Slider] ADD [discription] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
