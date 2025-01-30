ALTER PROC [dbo].[Forum_Search]
			  @Query nvarchar(50)
			  ,@PageIndex int
			  ,@PageSize int

/* ----------------- TEST CODE ------------------
Declare @Query nvarchar(50)= 'shou'
		    ,@PageIndex int = 0
		    ,@PageSize int = 5

execute [dbo].[Forum_Search]
		    @Query
		    ,@PageIndex 
		    ,@PageSize 
-----------------END TEST CODE ------------------*/
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
				   ,dbo.fn_GetUserJSON(f.[CreatedBy]) as [CreatedBy]

				   ,TotalCount = COUNT (1) over ()

			  FROM [dbo].[Forum] as f
			  Inner Join [dbo].[ForumCategories] as fc
			  ON f.ForumCategoryId = fc.Id
			  WHERE (f.[Name] LIKE '%' + @Query + '%' OR f.[Description] LIKE '%' + @Query + '%' )

			  ORDER BY f.[DateCreated] desc

			  OFFSET @Rows ROWS
			  FETCH NEXT @PageSize ROWS only

END
