ALTER proc [dbo].[Forum_Update]
		@Name nvarchar(4000)
		,@Description nvarchar(4000)
		,@ForumCategoryId int
		,@IsPrivate bit
	
		,@Id int 

/* ------------ TEST CODE ----------------
DECLARE @Name nvarchar(4000) = 'Bob Smith'
	,@Description nvarchar(4000) = ''
	,@ForumCategoryId int = 2
	,@IsPrivate bit = 1
	
	,@Id int = 1

EXECUTE [dbo].[Forum_Update]
	  @Name 
	  ,@Description 
	  ,@ForumCategoryId 
	  ,@IsPrivate 
	  ,@IsClosed 
	  ,@DateCreated 
	  ,@DateAdded 
	
	  ,@Id 

Select * from [dbo].[Forum]
*/ -----------END TEST CODE---------------
as 

BEGIN

	UPDATE [dbo].[Forum]
        SET 
          [Name] = @Name
          ,[Description] = @Description
          ,[ForumCategoryId] = @ForumCategoryId
          ,[IsPrivate] = @IsPrivate
     
	WHERE [Id] = @Id

 END
