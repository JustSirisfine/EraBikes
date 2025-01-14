using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.Forum;
using Sabio.Models.Interfaces;
using Sabio.Models.Requests.Forum;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/forum/forumanswers")]
    [ApiController]
    public class ForumAnswerApiController : BaseApiController
    {
        private ILogger _logger;
        private IForumAnswersService _forumAnswersService;
        private IAuthenticationService<int> _authenticationService;
        public ForumAnswerApiController(ILogger<ForumAnswerApiController> logger,
            IAuthenticationService<int> authenticationService,

            IForumAnswersService forumAnswersService) : base(logger)
        {
            _authenticationService = authenticationService;
            _logger = logger;
            _forumAnswersService = forumAnswersService;
        }


        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<ForumAnswers>> GetByIdWithAnswers(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                ForumAnswers forumWithAnswers = _forumAnswersService.GetForumWithAnswersById(id);

                if (forumWithAnswers == null)
                {
                    code = 404;
                    response = new ErrorResponse("Forum not found.");
                }
                else
                {
                    response = new ItemResponse<ForumAnswers> { Item = forumWithAnswers };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(code, response);
        }

        [HttpPost]

        public ActionResult Create(ForumAnswerAddRequest model)
        {
            ObjectResult result = null;
            int forumId = _authenticationService.GetCurrentUserId();
            try
            {
                int id = _forumAnswersService.AddAnswer(model, forumId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }

    }
}