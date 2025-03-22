BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Client] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [logo] NVARCHAR(1000),
    [website] NVARCHAR(1000) NOT NULL,
    [description] TEXT,
    [isActive] BIT NOT NULL CONSTRAINT [Client_isActive_df] DEFAULT 1,
    [order] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Client_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Client_pkey] PRIMARY KEY CLUSTERED ([id])
);

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
