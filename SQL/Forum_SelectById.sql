ALTER proc [dbo].[Forum_SelectById]
		@Id int

/* ---------------- TEST CODE ------------
Declare @Id int = 7

EXECUTE [dbo].[Forum_SelectById]
	@Id

*/ ---------------END TEST CODE-----------
as

BEGIN

		SELECT f.[Id]
			   ,f.[Name]
			   ,f.[Description]
			   ,f.[ForumCategoryId]
			   ,fc.[Name]
			   ,f.[IsPrivate]
			   ,f.[IsClosed]
			   ,f.[DateCreated]
			   ,f.[DateAdded] 

		  FROM [dbo].[Forum] as f 
		  Inner Join [dbo].[ForumCategories] as fc
		  ON f.[ForumCategoryId] = fc.[Id]

		  WHERE f.[Id] = @Id

END
