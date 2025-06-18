/*
  Warnings:

  - You are about to drop the column `tittle` on the `Brochure` table. All the data in the column will be lost.
  - Added the required column `title` to the `Brochure` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Brochure] DROP COLUMN [tittle];
ALTER TABLE [dbo].[Brochure] ADD [title] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
