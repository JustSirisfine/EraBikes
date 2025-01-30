ALTER proc [dbo].[Forum_SelectPaginated]
		@PageIndex int
		,@PageSize int

/* -------------------- TEST CODE -------------------

DECLARE @PageIndex int = 0
	,@PageSize int = 10

EXECUTE [dbo].[Forum_SelectPaginated]
	@PageIndex
	,@PageSize

*/ -------------------END TEST CODE------------------
as

BEGIN
	
		DECLARE @Rows int = @PageIndex * @PageSize

		SELECT f.[Id]
			   ,f.[Name]
			   ,f.[Description]
			   ,f.[ForumCategoryId]
			   ,fc.[Name]
			   ,f.[IsPrivate]
			   ,f.[IsClosed]
			   ,f.[DateCreated]
			   ,f.[DateAdded] 

			   ,TotalCount = COUNT (1) over ()

		FROM [dbo].[Forum] as f
		Inner Join [dbo].[ForumCategories] as fc
		on f.[ForumCategoryId] = fc.[Id]

		ORDER BY f.[DateCreated] DESC

		OFFSET @Rows ROWS
		FETCH NEXT @PageSize ROWS only 

END
