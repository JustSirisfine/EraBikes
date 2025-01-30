public class ForumAddRequest
{
    [Required]
    [StringLength(4000, MinimumLength = 5)]
    public string Name { get; set; }
    [Required]
    [StringLength(4000, MinimumLength = 20)]
    public string Description { get; set; }
    [Required]
    public int ForumCategoryId { get; set; }
    public int AuthorId { get; set; }
    public bool IsPrivate { get; set; }
}
