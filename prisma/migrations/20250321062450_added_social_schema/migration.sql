/*
  Warnings:

  - You are about to drop the column `content` on the `Slider` table. All the data in the column will be lost.
  - Added the required column `description` to the `Slider` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Slider] DROP COLUMN [content];
ALTER TABLE [dbo].[Slider] ADD [description] NVARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[Social] (
    [id] NVARCHAR(1000) NOT NULL,
    [platform] NVARCHAR(1000),
    [url] NVARCHAR(1000) NOT NULL,
    [isActive] BIT NOT NULL CONSTRAINT [Social_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Social_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Social_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
