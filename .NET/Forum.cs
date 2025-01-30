public class Forum
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public LookUp ForumCategoryId { get; set; }
    public bool IsPrivate { get; set; }
    public bool IsClosed { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateModified { get; set; }
    public BaseUser AuthorInfo { get; set; }
}
