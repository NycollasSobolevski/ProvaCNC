
using System.Text.Json.Serialization;

namespace webapi.Domain.Model;

public partial class Answer : TEntity
{

    public string Student { get; set; } = null!;

    public string UserAnswer { get; set; } = null!;

    public int Attempts { get; set; }

    public TimeOnly Time {get;set;}

    public int IdTest { get; set; }

    [JsonIgnore]
    public virtual Test IdTestNavigation { get; set; } = null!;
}
