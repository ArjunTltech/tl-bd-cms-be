BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Chatbot] ADD [order] INT;

-- CreateTable
CREATE TABLE [dbo].[Brochure] (
    [id] NVARCHAR(1000) NOT NULL,
    [tittle] NVARCHAR(1000) NOT NULL,
    [pdfFileUrl] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Brochure_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Brochure_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[dropdown_items] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [pdfUrl] NVARCHAR(1000),
    [pdfPublicId] NVARCHAR(1000),
    [isComingSoon] BIT NOT NULL CONSTRAINT [dropdown_items_isComingSoon_df] DEFAULT 0,
    [order] INT NOT NULL CONSTRAINT [dropdown_items_order_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [dropdown_items_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [sectionId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [dropdown_items_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[dropdown_sections] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [isEnabled] BIT NOT NULL CONSTRAINT [dropdown_sections_isEnabled_df] DEFAULT 1,
    [order] INT NOT NULL CONSTRAINT [dropdown_sections_order_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [dropdown_sections_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [dropdown_sections_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[dropdown_items] ADD CONSTRAINT [dropdown_items_sectionId_fkey] FOREIGN KEY ([sectionId]) REFERENCES [dbo].[dropdown_sections]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
