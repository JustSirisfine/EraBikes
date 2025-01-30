public interface IForumAnswersService
{
    int AddAnswer(ForumAnswerAddRequest model, int userId);
    ForumAnswers GetForumWithAnswersById(int forumId);
}
