using Sabio.Models.Domain.Forum;
using Sabio.Models.Requests.Forum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IForumAnswersService
    {
        int AddAnswer(ForumAnswerAddRequest model, int userId);
        ForumAnswers GetForumWithAnswersById(int forumId);
    }
}