SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE [dbo].[SPLoadUserByUserName]
    @user_name varchar(50) 
AS
    -- body of the stored procedure
    SELECT user_id, user_name, password, group_id, user_type_id, active
    FROM [User]
    WHERE user_name like @user_name


GO


