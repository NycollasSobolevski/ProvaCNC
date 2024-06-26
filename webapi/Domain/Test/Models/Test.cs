namespace webapi.Domain.Model;

public partial class Test : TEntity
{

    public string Code { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public int Attempts { get; set; }

    public string Question { get; set; } = null!;

    public string Answer { get; set; } = null!;

    public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();
}
