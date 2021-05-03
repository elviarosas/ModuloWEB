SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 create Procedure [dbo].[SPLoadUser] @user_id int 
as 
select user_id, user_name, group_id, user_type_id, created_by from [User]
where user_id = @user_id
GO

