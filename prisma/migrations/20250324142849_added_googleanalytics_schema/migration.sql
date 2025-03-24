BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[GoogleAnalytics] (
    [id] NVARCHAR(1000) NOT NULL,
    [trackingId] NVARCHAR(1000) NOT NULL,
    [propertyId] NVARCHAR(1000) NOT NULL,
    [viewId] NVARCHAR(1000),
    [apiKey] NVARCHAR(1000),
    [isActive] BIT NOT NULL CONSTRAINT [GoogleAnalytics_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [GoogleAnalytics_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [GoogleAnalytics_pkey] PRIMARY KEY CLUSTERED ([id])
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
