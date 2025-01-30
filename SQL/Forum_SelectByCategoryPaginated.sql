ALTER proc [dbo].[Forum_SelectByCategoryPaginated]
		@ForumCategoryId int
		,@PageIndex int
		,@PageSize int

as
/* ---------- TEST CODE ---------------
Declare @ForumCategoryId int = 1
	,@PageIndex int = 0
	,@PageSize int = 27

EXECUTE [dbo].[Forum_SelectByCategoryPaginated]
	@ForumCategoryId,
	@PageIndex,
	@PageSize

*/ ---------END TEST CODE--------------

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
			,dbo.fn_GetUserJSON(f.[CreatedBy]) as [CreatedBy]
			,TotalCount = COUNT (1) over ()

		FROM [dbo].[Forum] as f
		Inner Join [dbo].[ForumCategories] as fc
		ON f.ForumCategoryId = fc.Id
		WHERE fc.Id = @ForumCategoryId

		ORDER BY f.[DateCreated] desc

		OFFSET @Rows ROWS
		FETCH NEXT @PageSize ROWS only
END
