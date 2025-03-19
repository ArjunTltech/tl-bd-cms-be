BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[organizationDetails] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [companyName] NVARCHAR(1000) NOT NULL,
    [copyRight] NVARCHAR(1000) NOT NULL,
    [phoneNumber] NVARCHAR(1000) NOT NULL,
    [logo] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [organizationDetails_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [organizationDetails_email_key] UNIQUE NONCLUSTERED ([email])
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
