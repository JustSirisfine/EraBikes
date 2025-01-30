ALTER PROCEDURE [dbo].[Forum_SelectByIdV2]
				@Id INT

/* ---------------- TEST CODE ------------
Declare @Id INT = 4

EXECUTE [dbo].[Forum_SelectByIdV2]
		@Id

SELECT * FROM [dbo.forum]
*/ ---------------END TEST CODE-----------
as

BEGIN

    		SELECT 
    			f.[Id],
    			f.[Name],
    			f.[Description],
    			f.[ForumCategoryId],
    			fc.[Name] AS ForumCategoryName,
    			f.[IsPrivate],
    			f.[IsClosed],
    			f.[DateCreated],
    			f.[DateAdded],
    			[dbo].[fn_GetUserJSON](f.CreatedBy) AS AuthorId,
    		
    			(
    				SELECT 
    					fa.[Id] AS AnswerId,
    					fa.[AnswerTitle] AS AnswerTitle,
    					fa.[Description] AS AnswerDescription,		
    					[dbo].[fn_GetUserJSON](fa.AuthorId) AS AnswersAuthorId,
    					fa.[DateCreated] AS AnswerDateCreated,
    					fa.[ThreadId] AS AnswerThreadId
    				FROM [dbo].[ForumAnswers] AS fa
    				WHERE fa.[ThreadId] = f.[Id]
    				FOR JSON AUTO
    			) AS Answers 
    
    		FROM [dbo].[Forum] AS f
    		INNER JOIN [dbo].[ForumCategories] AS fc
    		ON f.[ForumCategoryId] = fc.[Id]
    		WHERE f.[Id] = @Id;

END
