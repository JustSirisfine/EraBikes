ALTER proc [dbo].[ForumAnswers_Insert]
					@AnswerTitle nvarchar(500),
					@AnswerDescription nvarchar(MAX),
					@AnswerAuthorId int,
					@AnswerThreadId int,

					@Id int OUTPUT

/* ------------- TEST CODE --------------------
DECLARE @AnswerTitle nvarchar(500) = 'The Title of a Comment/Answer',
		@Description nvarchar(MAX)= 'The description of a comment/answer, ideally where the commenting/answering will take place',
		@AuthorId int = 1,
		@ThreadId int = 1,

		@Id int OUTPUT

EXECUTE [dbo].[ForumAnswers_Insert]
		@AnswerTitle
		,@Description
		,@AuthorId
		,@ThreadId

		,@Id int OUTPUT

Select * from [dbo].[ForumAnswers]
*/ ------------END TEST CODE-------------------
as

BEGIN

	INSERT INTO [dbo].[ForumAnswers]
			   ([AnswerTitle]
			   ,[Description]
			   ,[AuthorId]
			   ,[ThreadId])
		 VALUES
			   (
			   @AnswerTitle
			   ,@AnswerDescription
			   ,@AnswerAuthorId
			   ,@AnswerThreadId
			   )
			   SET @Id = SCOPE_IDENTITY()

END
