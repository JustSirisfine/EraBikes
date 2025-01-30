[Route("api/forum")]
[ApiController]
public class ForumApiController : BaseApiController
{
    private ILogger _logger;
    private IForumService _forumService;
    private IAuthenticationService<int> _authenticationService;

    public ForumApiController(ILogger<ForumApiController> logger,
        IAuthenticationService<int> authenticationService,

        (IForumService forumService) : base(logger)
    {
        _authenticationService = authenticationService;
        _logger = logger;
        _forumService = forumService;
    }

    [HttpPost] 
    public ActionResult Create(ForumAddRequest model)
    {
        ObjectResult result = null;
        int forumId = _authenticationService.GetCurrentUserId();
        try
        {
            int id = _forumService.Add(model, forumId);
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

    [HttpPut("{id:int}")]
    public ActionResult Update(ForumUpdateRequest model)
    {
        int code = 200;
        BaseResponse response = null;
        try
        {
            _forumService.Update(model);
            response = new SuccessResponse();
        }
        catch (Exception ex)
        {
            code = 500;
            response = new ErrorResponse(ex.Message);
        }
        return StatusCode(code, response);
    }

    [HttpDelete("{id:int}")]
    public ActionResult Delete(int forumId)
    {
        int code = 200;
        BaseResponse response = null;
        try
        {
            _forumService.Delete(forumId);
            response = new SuccessResponse();
        }
        catch(Exception ex)
        {
            code = 500;
            response = new ErrorResponse(ex.Message);
        }
        return StatusCode(code, response);
    }

    [HttpGet("paginate")]
    [AllowAnonymous]
    public ActionResult<ItemResponse<Paged<Forum>>> Pagination(int pageIndex, int pageSize)
    {
        ActionResult result;
        try
        {
            Paged<Forum> paged = _forumService.Pagination(pageIndex, pageSize);
            if (paged == null)
            {
                result = NotFound404(new ErrorResponse("Records Not Found"));
            }
            else
            {
                ItemResponse<Paged<Forum>> response = new ItemResponse<Paged<Forum>>();
                response.Item = paged;
                result = Ok200(response);
            }
        }
        catch (Exception ex)
        {
            Logger.LogError(ex.ToString());
            result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
        }
        return result;
    }
    
    [HttpGet("search/paginate")]
    [AllowAnonymous]
    public ActionResult<ItemResponse<Paged<Forum>>> SearchPaginate(string query, int pageIndex, int pageSize)
    {
        ActionResult result;
        try
        {
            Paged<Forum> paged = _forumService.SearchPaginate(query, pageIndex, pageSize);
            if (paged == null)
            {
                result = NotFound404(new ErrorResponse("Records Not Found"));
            }
            else
            {
                ItemResponse<Paged<Forum>> response = new ItemResponse<Paged<Forum>>();
                response.Item = paged;
                result = Ok200(response);
            }
        }
        catch (Exception ex)
        {
            Logger.LogError(ex.ToString());
            result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
        }
        return result;
    }

    [HttpGet("paginate/bycategory")]
    public ActionResult<ItemResponse<Paged<Forum>>> SelectByCategory(int forumCategoryId, int pageIndex, int pageSize)
    {
        ActionResult result = null;
        try
        {
            Paged<Forum> paged = _forumService.SelectByCategory(forumCategoryId, pageIndex, pageSize);
            if (paged == null)
            {
                result = NotFound404(new ErrorResponse("Records Not Found"));
            }
            else
            {
                ItemResponse<Paged<Forum>> response = new ItemResponse<Paged<Forum>>();
                response.Item = paged;
                result = Ok200(response);
            }
        }
        catch (Exception ex)
        {
            Logger.LogError(ex.ToString());
            result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
        }
        return result;
    }

    [HttpGet("{id:int}")]
    [AllowAnonymous]
    public ActionResult<ItemResponse<Forum>> GetById(int id)
    {
        int code = 200;
        BaseResponse response = null;
        try
        {
            Forum aForum = _forumService.GetById(id);

            if (aForum == null)
            {
                code = 404;
                response = new ErrorResponse("Application Resource not found.");
            }
            else
            {
                response = new ItemResponse<Forum> { Item = aForum };
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
}
