using System;
using System.Collections.Generic;

namespace webapi.Domain.Model;

public partial class Answer : TEntity
{

    public string Student { get; set; } = null!;

    public string Answer1 { get; set; } = null!;

    public int Attempts { get; set; }

    public int IdTest { get; set; }


    public virtual Test IdTestNavigation { get; set; } = null!;
}
