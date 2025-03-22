/*
  Warnings:

  - Added the required column `updatedAt` to the `Enquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Slider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Slider` table without a default value. This is not possible if the table is not empty.
  - Made the column `platform` on table `Social` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Enquiry] ADD [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Enquiry_status_df] DEFAULT 'unread',
[updatedAt] DATETIME2 NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[organizationDetails] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [organizationDetails_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[updatedAt] DATETIME2 NOT NULL CONSTRAINT [organizationDetails_updatedAt_df] DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE [dbo].[Slider] ALTER COLUMN [subheading] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Slider] ADD [category] NVARCHAR(1000) NOT NULL,
[createdAt] DATETIME2 NOT NULL CONSTRAINT [Slider_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[updatedAt] DATETIME2 NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Social] ALTER COLUMN [platform] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[updatedAt] DATETIME2 NOT NULL CONSTRAINT [User_updatedAt_df] DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE NONCLUSTERED INDEX [Enquiry_email_idx] ON [dbo].[Enquiry]([email]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Enquiry_status_idx] ON [dbo].[Enquiry]([status]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Enquiry_createdAt_idx] ON [dbo].[Enquiry]([createdAt]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
