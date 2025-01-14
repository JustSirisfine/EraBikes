using Sabio.Models;
using Sabio.Models.Domain.Forum;
using Sabio.Models.Requests.Forum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IForumService
    {
        int Add(ForumAddRequest model, int userId);
        void Delete(int id);
        Forum GetById(int id);
        Paged<Forum> Pagination(int pageIndex, int pageSize);
        Paged<Forum> Search(string query, int pageIndex, int pageSize);
        Paged<Forum> SearchPaginate(string queary, int pageIndex, int pageSize);
        Paged<Forum> SelectByCategory(int forumCategoryId, int pageIndex, int pageSize);
        void Update(ForumUpdateRequest model);
    }
}
