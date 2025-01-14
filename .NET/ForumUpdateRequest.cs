using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Forum
{
    public class ForumUpdateRequest : ForumAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
