ALTER proc [dbo].[ForumCategories_DeletebyId]
			@Id int

/* ---------------- TEST CODE ------------
DECLARE @Id INT = 4

EXECUTE [dbo].[ForumCategories_DeletebyId]
		@Id

SELECT * FROM [dbo.ForumCategories]
*/ ---------------END TEST CODE-----------
as

BEGIN

  	DELETE from dbo.ForumCategories
  
  	WHERE [Id] = @Id

END
