ALTER proc [dbo].[Forum_Delete]
	@Id int

/* ------------- TEST CODE -----------
select* from [dbo].[Forum]

Declare @Id int = 3

Execute [dbo].[Forum_Delete]
		@Id

select* from [dbo].[Forum]
*/ ------------END TEST CODE----------

as

BEGIN
	DELETE FROM [dbo].[Forum]
	WHERE [Id] = @Id
END
