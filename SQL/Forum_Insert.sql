ALTER proc [dbo].[Forum_Insert]
		@Name nvarchar(4000)
		,@Description nvarchar(4000)
		,@ForumCategoryId int
		,@AuthorId int
		,@IsPrivate bit

		,@Id int OUTPUT

/* ------------ TEST CODE ------------
Declare @Name nvarchar(4000) = ''
		,@Description nvarchar(4000) = ''
		,@ForumCategoryId int = 1
		,@IsPrivate bit = 0

		,@Id int OUTPUT

Execute [dbo].[Forum_Insert]
		@Name 
		,@Description 
		,@ForumCategoryId 
		,@IsPrivate 

		,@Id int OUTPUT
		
select * from [dbo].[Forum]
*/-----------END TEST CODE -----------
as

BEGIN

	INSERT INTO [dbo].[Forum]
	      (
	         [Name]
	         ,[Description]
	         ,[ForumCategoryId]
	         ,[CreatedBy]
	         ,[IsPrivate]
	      )
	VALUES
     	      (
		@Name 
		,@Description 
		,@ForumCategoryId 
		,@AuthorId
		,@IsPrivate 
	      )

	SET @Id = SCOPE_IDENTITY()

END
